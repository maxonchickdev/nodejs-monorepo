import { type Configuration } from 'lint-staged';

const config: Configuration = {
  '*': [
    (): string => 'npm run lint:filesystem',
    (): string => 'npm run lint:clean',
  ],
  'apps/web/src/**/*.{ts,tsx}': [
    (): string => 'npm run lint:check -w apps/web',
    (): string => 'npm run lint:format:check -w apps/web',
  ],
  'apps/backend/src/**/*.ts': [
    (): string => 'npm run lint:check -w apps/backend',
    (): string => 'npm run lint:format:check -w apps/backend',
  ],
  'packages/shared/src/**/*.ts': [
    (): string => 'npm run lint:check -w packages/shared',
    (): string => 'npm run lint:format:check -w packages/shared',
  ],
};

export default config;
