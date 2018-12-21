var rVal = 40;
var gVal = 70;
var bVal = 200;
var colorShow = document.getElementById("colorshow");
initialize();

function initialize(){
	//setInterval(function(){ console.log("TESST"); console.log("TEST")}, 3);
	box = document.getElementById("box")
	for(col=0;col<50;col++){
		column = document.createElement("div");
		column.style.height="10px";
		column.style.display="inline";
		column.style.float="left";
		box.appendChild(column);
		for(row=0;row<50;row++){
			pixel = document.createElement("div");
			pixel.style.width="10px";
			pixel.style.height="10px";
			pixel.id="pixel_col_"+col+"_row_"+row
			pixel.name="pixel_col_"+col+"_row_"+row
			pixel.style.backgroundColor="white";
			pixel.addEventListener("mousedown", paintPixel);
			pixel.addEventListener("mouseenter", paintPixel);
			column.appendChild(pixel);
		}
	}
	
	initializeColorButtons();
	
	initializeSliders();
	saveButton = document.getElementById("Save-Button");
	saveButton.onclick=saveColors;
	loadButton = document.getElementById("Load-Button");
	loadButton.onclick=loadColors;
	uploadButton = document.getElementById("Upload-Button");
	uploadButton.addEventListener("click", uploadCanvas);
	downloadButton = document.getElementById("Download-Button");
	downloadButton.addEventListener("click", downloadCanvas);
	
	if (localStorage.getItem('pixel_col_0_row_0') !== null){
		loadColors();
	}
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

function initializeColorButtons(){
	colorButtons = document.getElementsByClassName("Color-Button");
	for (i=0; i<colorButtons.length; i++){
		red = colorButtons[i].getAttribute("red");
		green = colorButtons[i].getAttribute("green");
		blue = colorButtons[i].getAttribute("blue");
				
		color = "rgb("+red+","+green+","+blue+")";
		colorButtons[i].style.backgroundColor = color;
		colorButtons[i].addEventListener("click", changeColor);
	}
}

function changeColor(e){
	rVal = this.getAttribute("red");
	gVal = this.getAttribute("green");
	bVal = this.getAttribute("blue");
		
	rRange.value=rVal;
	rSpan.innerHTML=rVal;
	gRange.value=gVal;
	gSpan.innerHTML=gVal;
	bRange.value=bVal;
	bSpan.innerHTML=bVal;
	updateColorShow();
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

function saveColors(){
	console.log("Saving...");
	for (col=0;col<50;col++){
		for (row=0;row<50;row++){
			curPixel = "pixel_col_"+col+"_row_"+row;
			localStorage.setItem(String(curPixel), document.getElementById(curPixel).style.backgroundColor);
		}
	}
	console.log("Saved!");
}

function loadColors(){
	console.log("Loading...");
	for (col=0;col<50;col++){
		for (row=0;row<50;row++){
			curPixel = "pixel_col_"+col+"_row_"+row;
			document.getElementById(curPixel).style.backgroundColor = localStorage.getItem(curPixel);
		}
	}
	console.log("Loaded!");
}
		
function uploadCanvas(ev){
	put_url = window.location.protocol+"//"+window.location.hostname+":"+api_port;
	put_url += "/upload_canvas";
	
	canvas_data = {};
	for (col=0;col<50;col++){
		for (row=0;row<50;row++){
			curPixel = "pixel_col_"+col+"_row_"+row;
			canvas_data[curPixel] = document.getElementById(curPixel).style.backgroundColor;
		}
	}
	json_data = JSON.stringify(canvas_data);
	
	fetch(put_url, {
		method: "post",
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: json_data
	})
	.then(function(response) {
		return response.json();
	})
	.then(function(response) {
		console.log(response);
	})
}

function downloadCanvas(ev){
	get_url = window.location.protocol+"//"+window.location.hostname+":"+api_port;
	get_url += "/download_canvas";
	
	fetch(get_url, {
		method: "get"
	})
	.then(function(response) {
		return response.json();
	})
	.then(function(response) {
		for (col=0;col<50;col++){
			for (row=0;row<50;row++){
				curPixel = "pixel_col_"+col+"_row_"+row;
				document.getElementById(curPixel).style.backgroundColor = response[curPixel];
			}
		}
	})
	
	console.log("Canvas downloaded!");
}