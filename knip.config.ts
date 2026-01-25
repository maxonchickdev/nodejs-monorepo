import { type KnipConfig } from 'knip';

const config: KnipConfig = {
  $schema: 'https://unpkg.com/knip@5/schema.json',
  workspaces: {
    'apps/backend': {
      entry: ['src/main.ts'],
      project: ['src/**/*.ts'],
    },
    'apps/web': {
      entry: ['src/main.tsx', 'index.html'],
      project: ['src/**/*.{ts,tsx}'],
    },
    'packages/shared': {
      project: ['src/**/*.ts'],
    },
  },
  ignore: ['**/node_modules/**', '**/dist/**'],
  ignoreDependencies: [
    '@types/express',
    'source-map-support',
    'ts-loader',
    'ts-node',
    'tsconfig-paths',
    '@commitlint/cli',
    '@commitlint/types',
  ],
  typescript: {
    config: [
      'tsconfig.base.json',
      'tsconfig.json',
      'apps/*/tsconfig.json',
      'packages/*/tsconfig.json',
    ],
  },
};

export default config;
