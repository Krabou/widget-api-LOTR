var search = "character";
const list = document.getElementById("ring")
const URLy = `https://the-one-api.herokuapp.com/v1/${search}`;
const URLquote = `https://the-one-api.herokuapp.com/v1/${search}/${idName}/quote`
const quote = document.getElementById("quote");
const div = document.getElementById("lord");
var nameOfCharacters = null;
var idName = null;
const token = "u3koBWOmNFkm7IIb5QVw";
var recherche = null;
var tabIdFilms = [];
const URLmovies = `https://the-one-api.herokuapp.com/v1/movie`;
const TheReturnoftheKing = "5cd95395de30eff6ebccde5d";
const TheFellowshipoftheRing = "5cd95395de30eff6ebccde5c";
const TheTwoTowers = "5cd95395de30eff6ebccde5b";
const lord = document.getElementById("lord")



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
	all.innerHTML = "";

	response.forEach(element => {
		var name = element.name
		var birth = element.birth;
		var death = element.death;
		var race = element.race;
		all.innerHTML +=
		 ` <div><h3>${name}</h3>
			<li>Race : ${race}</li>
			<li>Naissance : ${birth}</li>
			<li>death ${death}</li>
			<a href="${element.wikiUrl}" ><input class="button" type="button" value="Page wiki"></a></div>`
		
	})



	document.getElementById("personnage").oninput = evt => {
		list.innerHTML = ""
		all.innerHTML=""
		lord.classList.toggle("active")
		// all.classList.toggle("no_active")
		const filtrePersonnage = (element) => element.filter(element => element.name.toLowerCase().match(evt.target.value.toLowerCase()));


		filtrePersonnage(response).forEach(element => {


			console.log(element._id, element);
			idName = element._id;
			let name = element.name
			var naissance = element.birth;
			var mort = element.death;
			var race = element.race;
			var concubin = element.spouse;
			var wikiUrl = element.wikiUrl

			all.innerHTML += ` 
			<div><h3>${name}</h3>
			<li>Race : ${race}</li>
			<li>Naissance : ${naissance}</li>
			<li>death ${mort}</li>
			<li>Concubin : ${concubin}</li>
			<a href="${wikiUrl}" ><input class="button" type="button" value="Page wiki"></a></div>`
			
			
			// var newLI = document.createElement("li");
			// var newContent = document.createTextNode(`Nom : ${rechercheName}, Naissance : ${naissance}, Mort : ${mort}, Race : ${race}, Concubin : ${concubin}, Wiki : ${wikiUrl}`);
			// list.appendChild(newLI);
			// newLI.appendChild(newContent);
			displayQuote()


		});
		console.log(filtrePersonnage)
	};
	console.log(`id >>>> ${idName}`)
}

function displayQuote() {
	const URLquote = `https://the-one-api.herokuapp.com/v1/${search}/${idName}/quote`
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


function movies() {
	console.log("https://the-one-api.herokuapp.com/v1/movie")

	axios
		.get(URLmovies, {
			headers: {
				'Authorization': `Bearer ${token}`
			}
		})
		.then((resp) => {
			console.log(resp.data.docs);
			iDFilm(resp.data.docs);
		})
		.catch((err) => console.error(err));
};
movies();

function iDFilm(element) {
	element.forEach(el => tabIdFilms.push(el.name));
	console.log("Noms films")
	console.log(tabIdFilms);

}

function filtreRace(evt) {
	console.log(evt.target.value);
	element.filter(race => race.match(evt.target.value));

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