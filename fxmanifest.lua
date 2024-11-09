fx_version 'cerulean'
game 'rdr3'
rdr3_warning 'I acknowledge that this is a prerelease build of RedM, and I am aware my resources *will* become incompatible once RedM ships.'
name 'J-notify'
author 'Jumar'


ui_page 'ui/ui.html'

client_scripts {
	'client/*.lua',
}


shared_scripts {
	'config.lua'
}

files {
	'ui/*.*'
}


escrow_ignore {
	'config.lua',
	'README.md'
}