import { type Configuration } from "lint-staged";

const config: Configuration = {
  "*": [
    (): string =>
      "concurrently 'npm run lint:filesystem' 'npm run lint:clean' 'npm run lint:editor'",
  ],
  "apps/web/src/**/*.{ts,tsx}": [],
  "apps/backend/src/**/*.ts": [],
  "packages/shared/src/**/*.ts": [],
};

export default config;
