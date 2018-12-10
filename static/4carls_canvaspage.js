var rVal = 40;
var gVal = 70;
var bVal = 200;
var colorShow = document.getElementById("colorshow");
initialize();

function initialize(){
	//setInterval(function(){ console.log("REEEEEEEEEE"); console.log("REEE")}, 3);
	box = document.getElementById("box")
	for(i=0;i<50;i++){
		column = document.createElement("div");
		column.style.height="10px";
		column.style.display="inline";
		column.style.float="left";
		box.appendChild(column);
		for(j=0;j<50;j++){
			pixel = document.createElement("div");
			pixel.style.width="10px";
			pixel.style.height="10px";
			pixel.id="pixel"+(i*50+j)
			pixel.style.backgroundColor="white";
			pixel.addEventListener("mousedown", paintPixel);
			pixel.addEventListener("mouseenter", paintPixel);
			column.appendChild(pixel);
		}
	}
	
	// colorButtons = document.getElementsByClassName("colorbutton");
	// for (i=0; i<colorButtons.length; i++){
		// colorButtons[i].addEventListener("click", changeColor);
	// }
	
	initializeSliders();
}

function paintPixel(e){
	e.preventDefault();
	if (e.which === 1) {
		//this.style.backgroundColor = "rgb("+Math.random()*255+", "+Math.random()*255+", "+Math.random()*255+")";
		this.style.backgroundColor = curColor();
	}
}

function curColor(){
	return "rgb("+rVal+","+gVal+","+bVal+")"
}

// function changeColor(e){
	// curColor = this.style.backgroundColor;
// }

function updateRed() {
	rVal = rRange.value;
	rSpan.innerHTML = rVal;
}

function updateGreen() {
	gVal = gRange.value;
	gSpan.innerHTML = gVal;
}

function updateBlue() {
	bVal = bRange.value;
	bSpan.innerHTML = bVal;
}

function updateColorShow() {
	colorShow.style.backgroundColor=curColor();
}

function initializeSliders(){
	var rRange = document.getElementById("rRange");
	var rSpan = document.getElementById("rSpan");
	var gRange = document.getElementById("gRange");
	var gSpan = document.getElementById("gSpan");
	var bRange = document.getElementById("bRange");
	var bSpan = document.getElementById("bSpan");
	
	rRange.value=rVal;
	rSpan.innerHTML=rVal;
	gRange.value=gVal;
	gSpan.innerHTML=gVal;
	bRange.value=bVal;
	bSpan.innerHTML=bVal;
	
	rRange.oninput = function() {
		updateRed();
		updateColorShow();
	}
	gRange.oninput = function() {
		updateGreen();
		updateColorShow();
	}
	bRange.oninput = function() {
		updateBlue();
		updateColorShow();
	}
	
	updateColorShow();
}
