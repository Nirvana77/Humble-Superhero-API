import { Controller, Get, Post, Body } from "@nestjs/common";
import * as fs from "fs";
import * as path from "path";

interface Superhero {
	name: string;
	superpower: string;
	humilityScore: number;
}

@Controller("superheroes")
export class SuperheroesController {
	private superheroes: Superhero[] = [];
	private filePath = path.join(__dirname, "superheroes.json");

	constructor() {
		this.loadSuperheroes();
	}

	// Load the superheroes from the JSON file safely
	loadSuperheroes() {
		try {
			if (!fs.existsSync(this.filePath)) {
				// Create the file if it doesn't exist for convenience
				fs.writeFileSync(this.filePath, "[]");
				return;
			}

			const data = fs.readFileSync(this.filePath, "utf8");
			if (!data.trim()) {
				this.superheroes = [];
			} else {
				this.superheroes = JSON.parse(data);
			}
		} catch (error) {
			console.error("Failed to load superheroes:", error);
			this.superheroes = [];

			// If the file is corrupted or unreadable, overwrite it with an empty array
			return this.saveSuperheroes();
		}
	}

	// Save the superheroes to the JSON file safely
	saveSuperheroes() {
		try {
			fs.writeFileSync(this.filePath, JSON.stringify(this.superheroes, null, 2));
		} catch (error) {
			console.error("Failed to save superheroes:", error);
		}
	}

	// Reset the list of superheroes (for testing purposes)
	resetSuperheroes() {
		this.superheroes = [];
		this.saveSuperheroes();
	}

	// POST: Add a new superhero
	// TODO: Add a unique identifier to each superhero to allow for updates and deletions
	@Post()
	addSuperhero(@Body() superhero: Superhero) {
		const { name, superpower, humilityScore } = superhero;

		if (humilityScore < 1 || humilityScore > 10) {
			throw new Error("Humility score must be between 1 and 10.");
		}

		this.superheroes.push({ name, superpower, humilityScore });
		this.saveSuperheroes();

		return { message: "Superhero added successfully" };
	}

	// GET: Fetch the list of superheroes sorted by humility score
	// TODO: Add a query parameter to sort by name or superpower
	@Get()
	getSuperheroes() {
		return this.superheroes;
	}
}
