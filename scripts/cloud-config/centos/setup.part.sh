prepare_install () {
	systemctl start setup-monitor.socket || return 1
	( sleep {{setupMonitorLife}} && systemctl stop setup-monitor.socket ) &

	grep -v 'Defaults    requiretty' <'/etc/sudoers' >'/tmp/sudoers' || return 1
	mv -f '/tmp/sudoers' '/etc/sudoers' || return 1
}


install_os_packages () {
	retry yum groupinstall -y 'Development Tools'
	retry yum install -y git zlib-devel
}


register_app () {
	local executable app_command
	expect_args executable app_command -- "$@"

	sed "s:__APP_COMMAND__:${app_command}:" <'/etc/systemd/system/app.service' >"/etc/systemd/system/${executable}.service" || return 1
	rm -f '/etc/systemd/system/app.service' || return 1
}


start_app () {
	local executable
	expect_args executable -- "$@"

	systemctl enable "${executable}" >'/dev/null' 2>&1 || return 1
	systemctl start "${executable}" 2>&1 | quote || return 1
}
