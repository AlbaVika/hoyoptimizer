var HSRcookie = null;
function getHSRCookie() {
	let dcookie = document.cookie.split(';');
	for(let i = 0; i <dcookie.length; i++) {
		let c = dcookie[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf('HSR=') == 0) {
			HSRcookie = c.substring(4);
			console.log(HSRcookie);
			break;
		}
	}
	if (!HSRcookie) {
		HSRcookie = {"characters":[],"lightcones":[],"relics":[]};
	}
	saveHSRCookie();
}

function saveHSRCookie() {
	const d = new Date();
	d.setTime(d.getTime() + (365*24*60*60*1000));
	let expires = "expires="+ d.toUTCString();
	document.cookie = "HSR=" + HSRcookie + ";" + expires + ";path=/";
}
