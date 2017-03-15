let tab_register = new Tab_Registery();
let b = (typeof browser == "undefined")? chrome : browser;

function execute(tabs){
	if(tab_register.add(tabs[0].id)){
		b.tabs.executeScript(null, {

			allFrames: false,
			file: "/scripts/info.js",
			runAt: "document_end"

		});

		b.tabs.insertCSS(null, {

			allFrames: false,
			file: "/css/styles.css"

		});
	} else if(tab_register.has(tabs[0].id)){
		b.tabs.executeScript(null, {

			allFrames: false,
			code: "_info = document.getElementById('pd-win-info');  if(_info) _info.remove();",
			runAt: "document_end"

		});

		if(typeof b.tabs.removeCSS != "undefined"){
			b.tabs.removeCSS(tabs[0].id, {

				allFrames: false,
				file: "/css/styles.css"

			});
		}

		tab_register.remove(tabs[0].id);
	}
}

let info = {

	currentWindow: true,
	active: true,

	url: [

		"*://*.proboards.com/*",
		"*://*.boards.net/*",
		"*://*.freeforums.net/*",
		"*://*.forums.net/*"

	]

};

b.browserAction.onClicked.addListener(() => {

	b.tabs.query(info, execute);

});

