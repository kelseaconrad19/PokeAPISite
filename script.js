const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const pokemonWeight = document.getElementById("weight");
const pokemonHeight = document.getElementById("height");
const pokemonTypes = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");
const spriteContainer = document.getElementById("sprite-container");
const progressBar = document.getElementsByClassName("progress-bar");
document.addEventListener("DOMContentLoaded", () => {
	const urlParams = new URLSearchParams(window.location.search);
	const pokemonNameOrId = urlParams.get("pokemon");
	console.log("Pokemon Name or ID from URL:", pokemonNameOrId); // Debugging line
	if (pokemonNameOrId) {
		getPokemon(pokemonNameOrId);
	}
});

const getPokemon = async (pokemonNameOrId) => {
	try {
		const res = await fetch(
			`https://pokeapi.co/api/v2/pokemon/${pokemonNameOrId.toLowerCase()}`
		);
		console.log("Fetch response:", res); // Debugging line
		if (!res.ok) {
			throw new Error("Pokemon not found");
		}
		const data = await res.json();
		console.log("Fetched Pokemon Data:", data); // Debugging line
		setPokemonInfo(data);
	} catch (err) {
		alert("Pokemon not found");
		console.error(err);
	}
};

const setPokemonInfo = (data) => {
	const { name, id, weight, height, types, stats, sprites } = data;
	pokemonName.textContent = `${name[0].toUpperCase()}${name.slice(1)}`;
	pokemonId.textContent = `#${id}`;
	pokemonWeight.textContent = `${weight}`;
	pokemonHeight.textContent = `${height}`;

	spriteContainer.innerHTML = `<img id="sprite" src="${sprites.front_default}" alt="${name}">`;

	for (let i = 0; i < progressBar.length; i++) {
		progressBar[i].style.width = `${(stats[i].base_stat / 255) * 100}%`;
	}
	progressBar[0].textContent = `${stats[0].base_stat}`;
	progressBar[1].textContent = `${stats[1].base_stat}`;
	progressBar[2].textContent = `${stats[2].base_stat}`;
	progressBar[3].textContent = `${stats[3].base_stat}`;
	progressBar[4].textContent = `${stats[4].base_stat}`;
	progressBar[5].textContent = `${stats[5].base_stat}`;

	// Clear previous types
	pokemonTypes.innerHTML = '<p id="versions">Types:</p>';

	// Add new types with colors
	types.forEach((typeInfo) => {
		const typeName = typeInfo.type.name;
		const typeSpan = document.createElement("span");
		typeSpan.classList.add(`${typeName}-type`);
		typeSpan.textContent = `${typeName[0].toUpperCase()}${typeName.slice(1)}`;
		pokemonTypes.appendChild(typeSpan);
	});
};

// Ensure the search button event listeners are correctly set up
searchButton.addEventListener("click", (e) => {
	e.preventDefault();
	const searchInput = document
		.getElementById("search-input")
		.value.toLowerCase();
	window.location.href = `poke_details.html?pokemon=${searchInput}`;
});

searchInput.addEventListener("keyup", (e) => {
	if (e.key === "Enter") {
		searchButton.click();
	}
});
