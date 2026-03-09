import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

const globalIgnores: string[] = [
  '**/dist/**',
  '**/node_modules/**',
  '**/*.d.ts',
  '**/.git/**',
  'apps/backend/prisma/generated',
];

export default defineConfig([
  {
    name: 'Global ignores',
    ignores: globalIgnores,
  },
  {
    name: 'Applications & Packages',
    files: ['apps/backend/src/**/*.ts', 'apps/web/src/**/*.{ts,tsx}', 'packages/shared/src/**/*.ts'],
    extends: tseslint.configs.recommended,
  },
]);
