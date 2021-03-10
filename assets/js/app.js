var search = "character";
const list = document.getElementById("ring")
const URLy = `https://the-one-api.dev/v2/${search}`;
const URLquote = `https://the-one-api.dev/v2/${search}/${idName}/quote`
const quote = document.getElementById("quote");
const div = document.getElementById("lord");
var nameOfCharacters = null;
var idName = null;
const token = "u3koBWOmNFkm7IIb5QVw";
var recherche = null;
var tabIdFilms = [];
const URLmovies = `https://the-one-api.dev/v2/movie`;
const TheReturnoftheKing = "5cd95395de30eff6ebccde5d";
const TheFellowshipoftheRing = "5cd95395de30eff6ebccde5c";
const TheTwoTowers = "5cd95395de30eff6ebccde5b";
const lord = document.getElementById("lord")
const btnRappel = document.getElementById("btnRappel")
const inputRace = document.getElementsByName("race");
const irace = document.querySelector('input[name="race"]').value
const btn = document.getElementById("btn")
var valeur;
console.log(irace)
console.log(btn)
console.log(inputRace)

// const inputRace = document.querySelector();
const all = document.getElementById("all")


function start() {
	axios
		.get(URLy, {
			headers: {
				'Authorization': `Bearer ${token}`
			}
		})
		.then((res) => {
			display(res.data.docs);
			console.log(res.data.docs)
		})
		.catch((err) => console.error(err));
}

function display(response) {
	// list.innerHTML = "";
	allCharacters(response)
	btn.onclick = ()=> {
		for(let i = 0; i < inputRace.length; i++){
			if(inputRace[i].checked){
			valeur = inputRace[i].value;
			console.log(valeur)
			} 
		   }
		  allCharacters(funcFiltreRace(response,valeur));
		}
function allCharacters (response){
	all.innerHTML = "";
	var i = 0
	response.forEach(element => {
		var div = document.createElement('div');
		all.appendChild(div);
		var name = element.name
		var birth = element.birth;
		var death = element.death;
		var race = element.race;
		
		div.innerHTML +=
			` <h3>${name}</h3>
			<li>Race : ${race}</li>
			<li>Naissance : ${birth}</li>
			<li>death ${death}</li>
			<a href="${element.wikiUrl}" ><input class="button" type="button" value="Page wiki"></a>
			<div id="overlay" class="overlay">
			<div id="popup" class="popup">
			<h2>
			Liste de quotes de ${name}
			</h2>
			<span id="buttonClose" class="btnClose">Close</span>
			<div id="citations">
			</div>
			</div>
			</div>
			`

		var buttonQuote = document.createElement("button")
		buttonQuote.textContent = "Quote"
		buttonQuote.setAttribute('class', 'btnPopup')
		buttonQuote.setAttribute('id', 'btnPopup')
		div.appendChild(buttonQuote);

		const btnClose  = document.querySelector(".btnClose")
		// var buttonClose = document.createElement("span")
		// buttonClose.textContent = "Close";
		// buttonClose.setAttribute('id', 'btnClose');
		// buttonClose.setAttribute('class', 'btnClose')
		var overlay = document.getElementById('overlay');
		var popUp = document.getElementById('popup')
		// popUp.appendChild(buttonClose)
		buttonQuote.onclick = (evt) => {
			console.log(evt.target, name)
			openMoadl();
		}


		function openMoadl() {
			overlay.style.display = 'block';
		}

		btnClose.addEventListener('click', closeModal);
		function closeModal() {
			overlay.style.display = 'none';
		}
		})
		
}

function search(response){
	document.getElementById("personnage").oninput = evt => {
		list.innerHTML = ""
		all.innerHTML = ""
		lord.classList.toggle("active")
		
		console.log("all >>", all)
		filtrePersonnage(response,evt.target.value).forEach(element => {
			console.log(element._id, element);
			idName = element._id;
			let name = element.name
			var naissance = element.birth;
			var mort = element.death;
			var race = element.race;
			var concubin = element.spouse;
			var wikiUrl = element.wikiUrl

			all.innerHTML += ` 
			<div>
			<h3>${name}</h3>
			<li>Race : ${race}</li>
			<li>Naissance : ${naissance}</li>
			<li>death ${mort}</li>
			<li>Concubin : ${concubin}</li>
			<a href="${wikiUrl}" ><input class="button" type="button" value="Page wiki"></a></div>`
			displayQuote()
			if (evt.target.value == ""){
				all.innerHTML = ""
			}

		});
		console.log(filtrePersonnage)
	};
}
	search(response);

	console.log(`id >>>> ${idName}`)
}

function displayQuote() {
	const URLquote = `https://the-one-api.dev/v2/${search}/${idName}/quote`
	console.log(URLquote)
	axios
		.get(URLquote, {
			headers: {
				'Authorization': `Bearer ${token}`
			}
		})
		.then((response) => {
			console.log("quote")
			console.log(response.data.docs)
			funcQuote(response.data.docs)
		})
		.catch((err) => console.error(err));
};

function funcQuote(obj) {
	const tabvide = [];

	if (obj !== tabvide) {
		obj.forEach(element => {
			if (element.movie == TheReturnoftheKing) {
				list.innerHTML += `<li><q>${element.dialog}</q></li>`;
			};
			if (element.movie == TheFellowshipoftheRing) {

				list.innerHTML += `<li><q>${element.dialog}</q></li>`
			};
			if (element.movie == TheTwoTowers) {

				list.innerHTML += `<li><q>${element.dialog}</q></li>`
			};
		})
	}

}
start();


// function movies() {
// 	console.log("https://the-one-api.dev/v2/movie")

// 	axios
// 		.get(URLmovies, {
// 			headers: {
// 				'Authorization': `Bearer ${token}`
// 			}
// 		})
// 		.then((resp) => {
// 			console.log(resp.data.docs);
// 			iDFilm(resp.data.docs);
// 		})
// 		.catch((err) => console.error(err));
// };
// movies();

function iDFilm(element) {
	element.forEach(el => tabIdFilms.push(el.name));
	console.log("Noms films")
	console.log(tabIdFilms);

}

function filtreRace(evt) {
	console.log(evt.target.value);
	element.filter(race => race.match(evt.target.value));

}

const filtrePersonnage = (element,search) => element.filter(element => element.name.toLowerCase().match(search.toLowerCase()));
const funcFiltreRace = (element,search) => {
	var tab = []
	element.forEach(el => {
		if(el.race == search){
			tab.push(el)
			}
	})
	console.log('>>>>>>>', tab)
		return tab

	}
	

// $.ajax({
// 	url: 'http://localhost:8080/resourceserver/protected-no-scope',
// 	type: 'GET',
// 	contentType: 'application/json'
// 	headers: {
// 	   'Authorization': 'Bearer <xAYN92xsgoLNBg0fRMSS
// >'
// 	},
// 	success: function (result) {
// 		// CallBack(result);
// 	},
// 	error: function (error) {

// 	}
//  });