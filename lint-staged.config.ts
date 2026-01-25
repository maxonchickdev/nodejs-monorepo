import { type Configuration } from 'lint-staged';

const config: Configuration = {
  'apps/**/*.{ts,tsx}': ['prettier -c'],
  'packages/**/*.ts': ['prettier -c'],
  '*.{js,ts,json,md,yml,yaml}': ['prettier -c'],
};

export default config;
