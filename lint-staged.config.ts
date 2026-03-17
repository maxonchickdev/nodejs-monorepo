import type { Configuration } from "lint-staged";

const config: Configuration = {
	"*": [
		(): string => "npm run lint:clean:check",
		(): string => "npm run lint:filesystem:check",
		(): string => "npm run lint:format:check",
		(): string => "npm run lint:check",
	],
	"apps/backend/**/*.ts": [
		(): string => "npm run lint:check -w apps/backend",
		(): string => "npm run lint:format:check -w apps/backend",
		(): string => "npm run lint:types:check -w apps/backend",
	],
	"apps/web/**/*.ts": [
		(): string => "npm run lint:check -w apps/web",
		(): string => "npm run lint:format:check -w apps/web",
		(): string => "npm run lint:types:check -w apps/web",
	],
	"packages/shared/**/*.ts": [
		(): string => "npm run lint:check -w packages/shared",
		(): string => "npm run lint:format:check -w packages/shared",
		(): string => "npm run lint:types:check -w packages/shared",
	],
};

export default config;
