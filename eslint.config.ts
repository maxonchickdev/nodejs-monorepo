import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig([
  tseslint.configs.base,
  {
    name: 'ESLint ignores',
    ignores: [
      'apps/web/dist',
      'apps/backend/dist',
      'packages/shared/dist',
      'node_modules',
    ],
  },
  {
    name: 'ESLint files',
    files: ['**/*.ts', '**/*.tsx'],
  },
]);
