import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default defineConfig([
  {
    name: 'Ignores',
    ignores: ['**/dist/**'],
  },
  {
    name: 'Files',
    files: ['**/*.ts', '**/*.tsx'],
    extends: [
      tseslint.configs.recommended,
      eslintConfigPrettier,
      eslintPluginPrettierRecommended,
    ],
  },
]);
