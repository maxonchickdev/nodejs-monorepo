import { type Configuration } from 'lint-staged';

const config: Configuration = {
  '*': 'npm run format:check',
};

export default config;
