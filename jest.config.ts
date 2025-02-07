/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
	preset: "ts-jest",
	testEnvironment: "node",
	moduleFileExtensions: ["js", "json", "ts"],
	rootDir: "./",
	testRegex: ".*\\.test\\.ts$",
	transform: {
		"^.+\\.(t|j)s$": "ts-jest"
	},
	collectCoverage: true,
	coverageDirectory: "./coverage"
};
