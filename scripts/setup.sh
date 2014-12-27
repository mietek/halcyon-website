#!/usr/bin/env bash

set -o pipefail

export BASHMENOT_URL='{{bashmenotUrl}}'
export HALCYON_URL='{{halcyonUrl}}'
export SETUP_APP_SOURCE_URL='{{appSourceUrl}}'
export SETUP_APP_COMMAND='{{appCommand}}'
export SETUP_APP_PORT='{{appPort}}'
export SETUP_MONITOR_LIFE='{{monitorLife}}'
export SETUP_MONITOR_PORT='{{monitorPort}}'


format_monitor () {
	cat <<-'EOF'
		#!/usr/bin/env bash
		echo -e 'HTTP/1.1 200 OK\r'
		echo -e "Date: $( date -Ru )\r"
		echo -e 'Access-Control-Allow-Origin: *\r'
		echo -e 'Content-Type: text/plain; charset=utf-8\r\n\r'
		tail -n +0 -F '/var/log/setup.log' --pid="${SETUP_INTERNAL_STREAM_PID}"
		echo -e '\r\n\r'
EOF
}


format_profile () {
	cat <<-EOF
		source <( halcyon/halcyon paths )
EOF
}


format_upstart_config () {
	cat <<-EOF
		start on runlevel [2345]
		respawn
		setuid app
		setgid app
		chdir /app
		env HOME=/app
		env PORT="${SETUP_APP_PORT:-8080}"
{{envVarLines}}
		exec "$1"
EOF
}


install_halcyon () {
	adduser --home '/app' --no-create-home --shell '/usr/sbin/nologin' --disabled-password --gecos '' app || return 1
	local uid gid
	uid=$( id -u app ) || return 1
	gid=$( id -g app ) || return 1

	echo '-----> Welcome to Haskell on DigitalOcean' >'/var/log/setup.log'

	( while true; do sleep 1; done ) &
	export SETUP_INTERNAL_STREAM_PID="$!"

	mkdir '/app' || return 1
	format_profile >'/app/.profile' || return 1
	format_monitor >'/app/setup-monitor.sh' || return 1
	chmod +x '/app/setup-monitor.sh' || return 1
	chown app:app -R '/app' '/var/log/setup.log' || return 1

	( cd '/tmp' && curl -LO 'http://mirrors.digitalocean.com/ubuntu/pool/universe/u/ucspi-tcp/ucspi-tcp_0.88-3_amd64.deb' ) || return 1
	dpkg -i '/tmp/ucspi-tcp_0.88-3_amd64.deb' || return 1

	tcpserver -D -H -R -u "${uid}" -g "${gid}" -l 0 0 "${SETUP_MONITOR_PORT:-4040}" '/app/setup-monitor.sh' &
	export SETUP_INTERNAL_MONITOR_PID="$!"

	local -a packages
	packages=()
	packages+=( 'build-essential' )
	packages+=( 'git' )
	packages+=( 'pigz' )
	packages+=( 'zlib1g-dev' )

	echo '-----> Installing OS packages' >>'/var/log/setup.log'

	apt-get update || return 1
	apt-get install -y "${packages[@]}" || return 1

	local url base_url branch
	url="${HALCYON_URL:-https://github.com/mietek/halcyon}"
	base_url="${url%#*}"
	branch="${url#*#}"
	if [[ "${branch}" == "${base_url}" ]]; then
		branch='master'
	fi

	echo -n '-----> Installing Halcyon...' >>'/var/log/setup.log'

	local commit_hash
	if ! commit_hash=$(
		git clone -q "${base_url}" '/app/halcyon' >'/dev/null' 2>&1 &&
		cd '/app/halcyon' &&
		git checkout -q "${branch}" >'/dev/null' 2>&1 &&
		git log -n 1 --pretty='format:%h'
	); then
		echo 'error' >>'/var/log/setup.log'
		return 1
	fi
	echo " done, ${commit_hash:0:7}" >>'/var/log/setup.log'
	chown app:app -R '/app' || return 1

	source <( HALCYON_NO_SELF_UPDATE=1 \
		'/app/halcyon/halcyon' paths ) || return 1
	BASHMENOT_NO_SELF_UPDATE=1 \
		source '/app/halcyon/lib/bashmenot/src.sh' || return 1

}


if ! install_halcyon; then
	echo '   *** ERROR: Failed to install Halcyon' >>'/var/log/setup.log'
	exit 1
fi


install_app () {
	if [[ -z "${SETUP_APP_SOURCE_URL:-}" ]]; then
		return 0
	fi

	local clone_dir source_dir
	clone_dir=$( get_tmp_dir 'setup-clone' ) || die

	log_begin "Cloning ${SETUP_APP_SOURCE_URL}..."

	local commit_hash
	if ! commit_hash=$( git_clone_over "${SETUP_APP_SOURCE_URL}" "${clone_dir}" ); then
		log_end 'error'
		die 'Failed to clone app'
	fi
	log_end "done, ${commit_hash:0:7}"

	sudo -u app bash -c "
		HOME='/app' \
		HALCYON_NO_SELF_UPDATE=1 \
			/app/halcyon/halcyon install \"${clone_dir}\" 2>&1 |
				tee -a '/var/log/setup.log'
	" || return 1

	kill "${SETUP_INTERNAL_STREAM_PID}" || return 1
	( sleep "${SETUP_MONITOR_LIFE:-3600}" && kill "${SETUP_INTERNAL_MONITOR_PID}" ) &

	local app_command
	app_command="${SETUP_APP_COMMAND:-}"
	if [[ -z "${app_command}" ]]; then
		local executable
		if executable=$(
			sudo -u app bash -c "
				HOME='/app' \
				HALCYON_NO_SELF_UPDATE=1 \
					/app/halcyon/halcyon executable "${clone_dir}" 2>'/dev/null'
			"
		); then
			expect_existing "/app/bin/${executable}"

			app_command="/app/bin/${executable}"
		fi
	fi
	if [[ -z "${app_command}" ]]; then
		log_warning 'Cannot create Upstart config' 2>'/var/log/setup.log'
		return 0
	fi

	format_upstart_config "${app_command}" >'/etc/init/app.conf' || return 1

	start app || return 1
}


install_app
