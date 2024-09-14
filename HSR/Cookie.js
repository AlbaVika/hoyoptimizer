var cookie = null;
function getCookie() {
  let dcookie = document.cookie.split(';');
	for(let i = 0; i <ca.length; i++) {
    let c = dcookie[i];
   	while (c.charAt(0) == ' ') {
      c = c.substring(1);
   	}
   	if (c.indexOf('database=') == 0) {
     	 cookie = c.substring(9);
   	}
  }
  if (!cookie) {
    cookie={"characters":[],"lightcones":[],"relics":[]};
  }
}
