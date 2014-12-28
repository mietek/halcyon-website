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
		echo -e 'Content-Type: text/plain; charset=utf-8\r'
		echo -e 'Connection: close\r\n\r'
		tail -n +0 -F '/var/log/setup.log'
		echo -e '\r\n\r'
EOF
}


format_upstart_config () {
	cat <<-EOF
		start on runlevel [2345]
		respawn
		setuid app
		setgid app
		chdir /app
		env USER=app
		env HOME=/app
		env PORT="${SETUP_APP_PORT:-8080}"
{{envVarLines}}
		exec "$1"
EOF
}


install_halcyon () {
	echo '-----> Welcome to Haskell on DigitalOcean' >&2
	echo >&2

	mkdir -p '/app' || return 1

	if ! id -u app 2>'/dev/null'; then
		adduser --home '/app' --no-create-home --shell '/usr/sbin/nologin' --disabled-password --gecos '' app >'/dev/null' || return 1
	fi

	local uid gid
	uid=$( id -u app ) || return 1
	gid=$( id -g app ) || return 1

	format_monitor >'/app/setup-monitor.sh' || return 1

	chmod +x '/app/setup-monitor.sh' || return 1
	chown app:app -R '/app' '/var/log/setup.log' || return 1

	echo '-----> Preparing to install' >&2

	while true; do
		if ( cd '/tmp' && curl -sLO 'http://mirrors.kernel.org/ubuntu/pool/universe/u/ucspi-tcp/ucspi-tcp_0.88-3_amd64.deb' ); then
			break
		fi
	done
	dpkg -i '/tmp/ucspi-tcp_0.88-3_amd64.deb' >'/dev/null' || return 1

	tcpserver -D -H -R -u "${uid}" -g "${gid}" -l 0 0 "${SETUP_MONITOR_PORT:-4040}" '/app/setup-monitor.sh' &
	export SETUP_INTERNAL_MONITOR_PID="$!"

	local -a packages
	packages=()
	packages+=( 'build-essential' )
	packages+=( 'git' )
	packages+=( 'pigz' )
	packages+=( 'zlib1g-dev' )

	echo '-----> Installing OS packages' >&2

	apt-get update -qq -o acquire::http::timeout=10 || true
	apt-get install -qq -y "${packages[@]}" >'/dev/null' 2>&1 || return 1

	local url base_url branch
	url="${HALCYON_URL:-https://github.com/mietek/halcyon}"
	base_url="${url%#*}"
	branch="${url#*#}"
	if [[ "${branch}" == "${base_url}" ]]; then
		branch='master'
	fi

	echo -n '-----> Installing Halcyon...' >&2

	local commit_hash
	if ! commit_hash=$(
		git clone -q "${base_url}" '/app/halcyon' >'/dev/null' 2>&1 &&
		cd '/app/halcyon' &&
		git checkout -q "${branch}" >'/dev/null' 2>&1 &&
		git log -n 1 --pretty='format:%h'
	); then
		echo 'error' >&2
		return 1
	fi
	echo " done, ${commit_hash:0:7}" >&2

	HALCYON_NO_SELF_UPDATE=1 \
		source '/app/halcyon/src.sh' || return 1
	chown app:app -R '/app' || return 1
}


if ! install_halcyon >'/var/log/setup.log' 2>&1; then
	echo '   *** ERROR: Failed to install Halcyon' >>'/var/log/setup.log'
	exit 0
fi


install_app () {
	if [[ -z "${SETUP_APP_SOURCE_URL:-}" ]]; then
		return 0
	fi

	local clone_dir source_dir
	clone_dir=$( get_tmp_dir 'setup-clone' ) || return 1

	log_begin "Cloning ${SETUP_APP_SOURCE_URL}..."

	local commit_hash
	if ! commit_hash=$( git_clone_over "${SETUP_APP_SOURCE_URL}" "${clone_dir}" ); then
		log_end 'error'
		log_error 'Failed to clone app'
		return 1
	fi
	log_end "done, ${commit_hash:0:7}"

	sudo -u app bash -c "
		USER='app' \
		HOME='/app' \
		HALCYON_NO_SELF_UPDATE=1 \
		HALCYON_NO_CLEAN_CACHE=1 \
			/app/halcyon/halcyon install \"${clone_dir}\"
	" || return 1

	( sleep "${SETUP_MONITOR_LIFE:-3600}" && kill "${SETUP_INTERNAL_MONITOR_PID}" ) &

	local executable
	if ! executable=$(
		sudo -u app bash -c "
			USER='app' \
			HOME='/app' \
			HALCYON_NO_SELF_UPDATE=1 \
				/app/halcyon/halcyon executable \"${clone_dir}\" 2>'/dev/null'
		"
	); then
		log_warning 'Cannot determine executable'
		return 0
	fi
	expect_existing "/app/bin/${executable}"

	local app_command
	app_command="${SETUP_APP_COMMAND:-/app/bin/${executable}}"
	if [[ -z "${app_command}" ]]; then
		log_warning 'Cannot create Upstart config'
		return 0
	fi

	log 'Creating Upstart config'

	format_upstart_config "${app_command}" >"/etc/init/${executable}.conf" || return 1

	log 'Starting app'

	start "${executable}" 2>&1 | quote || return 1

	local ip_address
	ip_address=$( curl -s http://169.254.169.254/metadata/v1/interfaces/public/0/ipv4/address ) || return 1

	log
	log
	log 'Installation succeeded'
	log
	log 'To see the app:'
	log_indent "$ open http://${ip_address}:${SETUP_APP_PORT:-8080}"
}


if ! install_app 2>>'/var/log/setup.log'; then
	log_error 'Failed to install app' 2>>'/var/log/setup.log'
fi
