import { Test, TestingModule } from "@nestjs/testing";
import { SuperheroesController } from "../superheroes/controller";
import * as fs from "fs";
import * as path from "path";

describe("SuperheroesController", () => {
	let controller: SuperheroesController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [SuperheroesController]
		}).compile();

		controller = module.get<SuperheroesController>(SuperheroesController);

		// Copy the superheroes.json file to prevent data loss
		const source = path.join(__dirname, "../superheroes/superheroes.json");
		const dest = path.join(__dirname, "../superheroes/superheroes.json.bak");
		fs.copyFileSync(source, dest);

		controller.resetSuperheroes();
	});

	afterEach(() => {
		// Restore the superheroes.json file
		const source = path.join(__dirname, "../superheroes/superheroes.json.bak");
		const dest = path.join(__dirname, "../superheroes/superheroes.json");

		fs.copyFileSync(source, dest);
		fs.unlinkSync(source);
	});

	it("should be defined", () => {
		expect(controller).toBeDefined();
	});

	it("should add a superhero and return a success message", () => {
		const result = controller.addSuperhero({
			name: "Test Hero",
			superpower: "Testing power",
			humilityScore: 8
		});

		expect(result).toEqual({ message: "Superhero added successfully" });
		const length = controller.getSuperheroes().length;
		expect(length).toBe(1);
	});

	it("should return superheroes sorted by humility score", () => {
		controller.addSuperhero({
			name: "Hero A",
			superpower: "Strength",
			humilityScore: 5
		});

		controller.addSuperhero({
			name: "Hero B",
			superpower: "Speed",
			humilityScore: 9
		});

		const superheroes = controller.getSuperheroes();
		expect(superheroes[0].humilityScore).toBe(9);
	});
});
