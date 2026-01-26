import { type Configuration } from 'lint-staged';

const config: Configuration = {
  'apps/**/*.{ts,tsx}': ['prettier -c', 'eslint'],
  'packages/**/*.ts': ['prettier -c', 'eslint'],
  '*.{js,ts,json,md,yml,yaml}': ['prettier -c', 'eslint'],
};

export default config;
