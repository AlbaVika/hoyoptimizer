function loadLCData() {
	document.cookie = "database={'a':2}; path=../";
	document.cookie = "database2={'b':1}; path=/";
	let dcookie = decodeURIComponent(document.cookie);
	console.log(document.cookie);
	loadNLCData();
	SelectNLC('ASecretVow');
}

var wnlc = null;
var bwidth = 135;
var bheight = 18;
var tmargin = 10;
var nlca = 0;
function newLC() {
	var button = document.getElementById("NewLC");
	var text = document.getElementById("NLCText");
	var menu = document.getElementById("Menu");
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
	var button = document.getElementById("NewLC");
	var text = document.getElementById("NLCText");
	var menu = document.getElementById("Menu");
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

var path="Any";
function loadNLCData() {
	var lightcones={};
	var filter = document.getElementById("NLCinput").value.toUpperCase();
	for(const lc in lcdata) {
		if(path=="Any" || lcdata[lc].path==path) {
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
	path = name;
	if (name == 'Any') {
		drop.src = "../Any.png";
	} else {
		drop.src = "paths/"+name+".png";
	}
	loadLCData();
}

var nlcname;
var nlclevel;
var nlcsuper;
function SelectNLC(name) {
	nlcsuper = 1;
	nlcname = name;
	var img = document.getElementById("LCImage");
	img.src = "lightcones/" + name + ".png";
	img.alt = lcdata[name].name;
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
	var desc = document.getElementById("Description");
	var stats = document.getElementById("NLCStats").getElementsByTagName("td");
	var level = document.getElementById("NLCSlider");
	var lvltxt = document.getElementById("NLCLevel");
	var ascension = (level.value >=20 ? Math.floor((parseInt(level.value)+1)/11) - 1 : 0);
	var lvl = level.value - ascension;
	var text = lcdata[nlcname].description[0];
	for(let i = 1; i < lcdata[nlcname].description.length; i++) {
		text += lcdata[nlcname].ddata[i-1][nlcsuper-1] + lcdata[nlcname].description[i]
	}
	desc.innerHTML = text;
	lvltxt.innerHTML = "Lvl. " + lvl + (((parseInt(level.value)+1)%11 == 0 && level.value != 10) ? "+" : "");
	stats[0].innerHTML = `ATK: ${Math.floor((2.16+.72*lvl+7.68*(ascension>0 ? ascension:0.25)) * lcdata[nlcname].stats[0])}`;
	stats[1].innerHTML = `HP: ${Math.floor((1.08+.36*lvl+3.84*(ascension>0 ? ascension:0.25)) * lcdata[nlcname].stats[1])}`;
	stats[2].innerHTML = `DEF: ${Math.floor((1.35+.45*lvl+4.8*(ascension>0 ? ascension:0.25)) * lcdata[nlcname].stats[2])}`;
}
