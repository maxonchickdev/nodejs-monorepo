import { type KnipConfig } from 'knip';

const config: KnipConfig = {
  $schema: 'https://unpkg.com/knip@5/schema.json',
  workspaces: {
    'apps/backend': {
      entry: [
        'src/main.ts',
        'src/common/guards/jwt.guard.ts',
        'src/common/enums/**/*.ts',
      ],
      project: ['src/**/*.ts'],
    },
    'apps/web': {
      entry: ['index.html'],
      project: ['src/**/*.{ts,tsx}'],
    },
    'packages/shared': {
      project: ['src/**/*.ts'],
    },
  },
  ignoreDependencies: ['source-map-support', '@commitlint/types', 'ioredis'],
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
