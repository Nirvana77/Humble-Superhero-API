const form = document.getElementById("superhero-form");
const superheroList = document.getElementById("superhero-list");

// Fetch existing superheroes on page load
async function fetchSuperheroes() {
	const response = await fetch("/superheroes");
	const heroes = await response.json();
	displaySuperheroes(heroes);
}

// Display superheroes in the list
function displaySuperheroes(heroes) {
	superheroList.innerHTML = "";
	heroes.forEach((hero) => {
		const li = document.createElement("li");
		li.textContent = `${hero.name} (Superpower: ${hero.superpower}, Humility: ${hero.humilityScore})`;
		superheroList.appendChild(li);
	});
}

// Handle form submission
form.addEventListener("submit", async (event) => {
	event.preventDefault();

	const name = document.getElementById("name").value;
	const superpower = document.getElementById("superpower").value;
	const humilityScore = document.getElementById("humilityScore").value;

	const newHero = { name, superpower, humilityScore: Number(humilityScore) };

	// Send POST request to add the superhero
	await fetch("/superheroes", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(newHero)
	});

	// Clear the form and reload the list
	form.reset();
	fetchSuperheroes();
});

// Initial fetch of superheroes
fetchSuperheroes();
