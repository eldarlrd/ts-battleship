import js from '@eslint/js';
import vitest from '@vitest/eslint-plugin';
import eslintConfigPrettier from 'eslint-config-prettier';
import { flatConfigs } from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import nodePlugin from 'eslint-plugin-n';
import noRelativeImportPaths from 'eslint-plugin-no-relative-import-paths';
// @ts-expect-error: missing type declaration
import pluginPromise from 'eslint-plugin-promise';
import solid from 'eslint-plugin-solid/configs/typescript';
import globals from 'globals';
import tseslint, { type Config } from 'typescript-eslint';

export default tseslint.config({
  extends: [
    js.configs.recommended,
    ...tseslint.configs.strictTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
    flatConfigs.recommended,
    nodePlugin.configs['flat/recommended-module'],
    pluginPromise.configs['flat/recommended'],
    jsxA11y.flatConfigs.strict,
    solid,
    vitest.configs.recommended,
    eslintConfigPrettier
  ],
  files: ['**/*.{ts,tsx}'],
  settings: {
    'import/parsers': { '@typescript-eslint/parser': ['.ts', '.tsx'] },
    'import/resolver': { typescript: true, node: true }
  },
  languageOptions: {
    globals: {
      ...globals.serviceworker,
      ...globals.browser,
      ...globals.es2026
    },
    parser: tseslint.parser,
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      projectService: true
    }
  },
  plugins: {
    'no-relative-import-paths': noRelativeImportPaths
  },
  rules: {
    '@typescript-eslint/no-unused-vars': 2,
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/explicit-member-accessibility': 2,
    '@typescript-eslint/explicit-function-return-type': 2,
    '@typescript-eslint/consistent-type-imports': [2, { fixStyle: 'inline-type-imports' }],
    'no-relative-import-paths/no-relative-import-paths': [1, { rootDir: 'src', prefix: '@' }],
    'import/order': [1, { 'newlines-between': 'always', alphabetize: { order: 'asc' } }],
    'import/consistent-type-specifier-style': [1, 'prefer-inline'],
    'import/extensions': [2, 'ignorePackages'],
    'import/no-named-as-default-member': 0,
    'import/no-useless-path-segments': 2,
    'import/no-named-as-default': 0,
    'import/group-exports': 2,
    'vitest/no-test-return-statement': 2,
    'vitest/consistent-test-filename': 2,
    'vitest/prefer-equality-matcher': 2,
    'vitest/prefer-lowercase-title': 2,
    'vitest/prefer-strict-equal': 2,
    'vitest/consistent-test-it': 2,
    'vitest/no-test-prefixes': 2,
    'n/no-unsupported-features/node-builtins': 0,
    'n/no-missing-import': 0,
    'no-unused-vars': 0,
    'no-undef': 0,
    'prefer-const': 1,
    'padding-line-between-statements': [1,
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: ['directive', 'const', 'let', 'var'], next: '*' },
      { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] }],
    eqeqeq: 2,
  }
}) as Config;
