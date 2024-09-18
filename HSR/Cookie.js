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
			break;
		}
	}
	if (!HSRcookie) {
		HSRcookie = '{"characters":[],"lightcones":[],"relics":[]}';
	}
	HSRcookie = JSON.parse(decodeURIComponent(HSRcookie));
	saveHSRCookie();
}

function saveHSRCookie() {
	const d = new Date();
	d.setTime(d.getTime() + (365*24*60*60*1000));
	let expires = "expires="+ d.toUTCString();
	document.cookie = "HSR=" + JSON.stringify(HSRcookie) + ";" + expires + ";path=/";
}
