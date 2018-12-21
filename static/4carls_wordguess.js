var guess_results;
initialize();

function initialize(){
	guess_results = document.getElementById("Guess-Results");
	
	guess_form = document.getElementById('Guess-Form');
	guess_form.addEventListener("submit", calc_guess_words);
}

function calc_guess_words(ev){
	ev.preventDefault();
	//guess_results.innerText = "You made a guess!";

	makeguess_url = window.location.protocol+"//"+window.location.hostname+":"+port;
	makeguess_url += "/wordguess/makeguess";
	
	fetch(makeguess_url, {
		method:"POST",
		body: new FormData(this)
	})
	.then(function(response) {
		return response.json();
	})
	.then(function(response) {
		guess_results.innerText = response;
		if (response === "All correct!") {
			window.location.href = window.location.protocol+"//"+window.location.hostname+":"+port+"/secretpage"
		}
	})
}