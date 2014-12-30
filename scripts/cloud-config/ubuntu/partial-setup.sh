prepare_install () {
	start setup-monitor >'/dev/null' || return 1
	( sleep {{setupMonitorLife}} && stop setup-monitor ) &
}


install_os_packages () {
	retry apt-get update -o acquire::http::timeout=2 -o acquire::ftp::timeout=2
	retry apt-get install -y build-essential git pigz zlib1g-dev
}


register_app () {
	local executable app_command
	expect_args executable app_command -- "$@"

	sed "s:__APP_COMMAND__:${app_command}:" <'/etc/init/app.conf' >"/etc/init/${executable}.conf" || return 1
	rm -f '/etc/init/app.conf' || return 1
}


start_app () {
	local executable
	expect_args executable -- "$@"

	start "${executable}" 2>&1 | quote || return 1
}
