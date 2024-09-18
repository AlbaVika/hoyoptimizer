function loadLC() {
	getHSRCookie();
	loadLCData();
	loadNLCData();
	SelectNLC('ASecretVow');
}

function loadLCData() {
	let div = document.getElementById("LightCones");
	let s = "<tr><th width='12.5%'></th><th width='15%'></th><th></th width='6%'><th width='12.5%'></th><th width='15%'></th><th></th width='6%'><th width='12.5%'></th><th width='15%'></th><th></th width='6%'></tr><tr>";
	for(let i = 0; i < HSRcookie.lightcones.length; i++) {
		let lc = HSRcookie.lightcones[i];
		if (!lcdata[lc.key]) continue;
		let colour = lcdata[lc.key].rarity == 3 ? "#73b0f4" : lcdata[lc.key].rarity == 4 ? "#c199fd" : "#ffc870";
		let onclick = "onclick=editLC(" + i + ")";
		s += "<td style='background-color:" + colour + "; cursor:pointer'" + onclick + "><center><div style='position: relative; display:inline-block'><img src='lightcones/" + lc.key + ".png' width=100 height=100><div style='background-color:#333; color:#f2f2f2; position: absolute; bottom: 8px; right: 16px; padding: 7px 8px'>" +
			getRoman(lc.superimposition) + "</div></div></center></td><td style='text-align:center; background-color:" + colour + "; cursor:pointer'" + onclick + "><h3>" + lcdata[lc.key].name +
			"</h3></td><td style='background-color:" + colour + "; cursor:pointer'" + onclick + ">Lvl." + lc.level + (lc.level > 10 && lc.level / 10 == lc.ascension + 1 ? "+" : "") + "</td>";
		if (i%3 == 2) s += "</tr><tr>";
	}
	div.innerHTML = s + "</tr>";
}

function getRoman(i) {
	if (i==1)
		return 'I';
	if (i==2)
		return 'II';
	if (i==3)
		return 'III';
	if (i==4)
		return 'IV';
	if (i==5)
		return 'V';
	return "";
}

function editLC(i) {
	let input = document.getElementById("NLCinput");
	let delbutton = document.getElementById("delButton");
	let lc = HSRcookie.lightcones[i];
	newLC();
	input.value = lcdata[lc.key].name;
	input.disabled = true;
	delbutton.style.display = "";
	lci = i;
	loadNLCData();
	SelectNLC(lc.key);
	NLCSuperposition(lc.superimposition);
}

var wnlc = null;
var bwidth = 135;
var bheight = 18;
var tmargin = 10;
var nlca = 0;
var lci;
function newLC() {
	let button = document.getElementById("NewLC");
	let delbutton = document.getElementById("delButton");
	let text = document.getElementById("NLCText");
	let menu = document.getElementById("Menu");
	let input = document.getElementById("NLCinput");
	input.value = "";
	input.disabled = false;
	delbutton.style.display = "none";
	lci=-1;
	button.className = "buttonextended";
	button.onclick = "";
	clearInterval(wnlc);
	wnlc = setInterval(newLCinAnimation1,10);
	function newLCinAnimation1() {
		bwidth += 40;
		if(bwidth >= menu.clientWidth - 100) {
			button.style.width = "";
			button.style.height = "18px";
			clearInterval(wnlc);
			wnlc = setInterval(newLCinAnimation2,10);
			function newLCinAnimation2() {
				bheight += 20;
				tmargin -= 2;
				if(bheight >= 495) {
					button.style.height = "495px";
					clearInterval(wnlc);
				} else {
					button.style.height = bheight + 'px';
					text.style.marginTop = tmargin + 'px';
				}
			}
		} else {
			button.style.width = bwidth + 'px';
		}
	}
}

function closeNLC() {
	let button = document.getElementById("NewLC");
	let text = document.getElementById("NLCText");
	let menu = document.getElementById("Menu");
	clearInterval(wnlc);
	wnlc = setInterval(newLCoutAnimation1,10);
	function newLCoutAnimation1() {
		bheight -= 20;
		tmargin += 2;
		if(bheight <= 18) {
			button.style.height = '18px';
			text.style.marginTop = '0px';
			clearInterval(wnlc);
			wnlc = setInterval(newLCoutAnimation2,10);
			function newLCoutAnimation2() {
				bwidth -= 40;
				if(bwidth <= 135) {
					button.style.width = '135px';
					clearInterval(wnlc);
					button.className = "button";
					button.onclick = function(){newLC();};
				} else {
					button.style.width = bwidth + 'px';
				}
			}
		} else {
			button.style.height = bheight + 'px';
			text.style.marginTop = tmargin + 'px';
		}
	}
}

function deleteLC() {
	if(lci==-1) return;
	HSRcookie.lightcones.splice(lci,1);
	saveHSRCookie();
	loadLCData();
	closeNLC();
}

function saveNLCData() {
	if(lci==-1) {
		HSRcookie.lightcones.push({"key":nlcname,"level":nlclevel,"ascension":nlcascension,"superimposition":nlcsuper});
	} else {
		HSRcookie.lightcones[lci] = {"key":nlcname,"level":nlclevel,"ascension":nlcascension,"superimposition":nlcsuper};
	}	
	loadLCData();
	saveHSRCookie();
	closeNLC()
}

var nlcpath="Any";
function loadNLCData() {
	var lightcones={};
	var filter = document.getElementById("NLCinput").value.toUpperCase();
	for(const lc in lcdata) {
		if(nlcpath=="Any" || lcdata[lc].path==nlcpath) {
			if (lcdata[lc].name.toUpperCase().indexOf(filter) > -1) {
				lightcones[lc] = lcdata[lc];
			}
		}
	}
	var i = 0;
	var a = document.getElementById("LCDropdown").getElementsByTagName("a");
	for(const lc in lightcones) {
		a[i].style.display = "";
		a[i].onclick = function(){SelectNLC(lc);};
		a[i].style.backgroundColor = lightcones[lc].rarity == 3 ? "#73b0f4" : lightcones[lc].rarity == 4 ? "#c199fd" : "#ffc870";
		a[i].innerHTML = "<img src='lightcones/" + lc + ".png' style='vertical-align: middle;' width=50 height=50><span style='vertical-align: middle;'>" + lightcones[lc].name + "</span>";
		if(i == 6) break;
		i++;
	}
	for(;i<7;i++) {
		a[i].style.display = "none";
	}
}

function nlcChangePath(name) {
	var drop = document.getElementById("NLCPath");
	nlcpath = name;
	if (name == 'Any') {
		drop.src = "../Any.png";
	} else {
		drop.src = "paths/"+name+".png";
	}
	loadLCData();
}

var nlcname;
var nlclevel;
var nlcascension;
var nlcsuper = 1;
function SelectNLC(name) {
	nlcname = name;
	var img = document.getElementById("LCImage");
	var lname = document.getElementById("LCName");
	img.src = "lightcones/" + name + ".png";
	img.alt = lcdata[name].name;
	lname.innerHTML = lcdata[name].name;
	NLCSuperposition(1);
}

function NLCSuperposition(superposition) {
	var a = document.getElementById("NLCSuper").getElementsByTagName("a");
	a[nlcsuper-1].className = "";
	nlcsuper = superposition;
	a[superposition-1].className = "active";
	UpdateNLC();
}

function UpdateNLC() {
	let desc = document.getElementById("Description");
	let stats = document.getElementById("NLCStats").getElementsByTagName("td");
	let level = document.getElementById("NLCSlider");
	let lvltxt = document.getElementById("NLCLevel");
	let ascension = (level.value >=20 ? Math.floor((parseInt(level.value)+1)/11) - 1 : 0);
	let lvl = level.value - ascension;
	nlclevel = lvl;
	nlcascension = ascension;
	let text = lcdata[nlcname].description[0];
	for(let i = 1; i < lcdata[nlcname].description.length; i++) {
		text += lcdata[nlcname].ddata[i-1][nlcsuper-1] + lcdata[nlcname].description[i]
	}
	desc.innerHTML = text;
	lvltxt.innerHTML = "Lvl. " + lvl + (((parseInt(level.value)+1)%11 == 0 && level.value != 10) ? "+" : "");
	stats[0].innerHTML = `ATK: ${Math.floor((2.16+.72*lvl+7.68*(ascension>0 ? ascension:0.25)) * lcdata[nlcname].stats[0])}`;
	stats[1].innerHTML = `HP: ${Math.floor((1.08+.36*lvl+3.84*(ascension>0 ? ascension:0.25)) * lcdata[nlcname].stats[1])}`;
	stats[2].innerHTML = `DEF: ${Math.floor((1.35+.45*lvl+4.8*(ascension>0 ? ascension:0.25)) * lcdata[nlcname].stats[2])}`;
}
