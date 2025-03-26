import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import cypressPlugin from 'eslint-plugin-cypress';
import globals from 'globals';

export default [
  // Базовые рекомендуемые правила JavaScript
  js.configs.recommended,

  // Игнорируем директории, которые не нужно проверять
  {
    ignores: ['**/node_modules/**', 'dist/**', 'build/**', 'coverage/**'],
  },

  // Общие правила для всех файлов TypeScript и JavaScript
  {
    files: ['**/*.ts', '**/*.js'],
    plugins: {
      '@typescript-eslint': tseslint,
      cypress: cypressPlugin,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
      },
      // Добавляем все необходимые глобальные переменные
      globals: {
        ...globals.node,
        ...globals.mocha, // describe, it, before, beforeEach, after, afterEach
        cy: 'readonly',
        Cypress: 'readonly',
        expect: 'readonly',
        assert: 'readonly',
        chai: 'readonly',
      },
    },
    rules: {
      // Отключаем правила JavaScript, которые заменяются TypeScript-версиями
      'no-unused-vars': 'off',
      'no-undef': 'off', // TypeScript сам проверяет типы
      'no-redeclare': 'off',

      // Общие правила кодирования
      'no-console': 'warn',
      'no-debugger': 'error',
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      curly: ['error', 'all'],

      // TypeScript-специфичные правила
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/no-inferrable-types': 'error',
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],

      // Cypress-специфичные правила
      'cypress/no-unnecessary-waiting': 'warn',
      'cypress/no-async-tests': 'error',
      'cypress/assertion-before-screenshot': 'warn',
      'cypress/no-force': 'warn',
      'cypress/no-assigning-return-values': 'error',
    },
  },

  // Дополнительные правила для тестовых файлов
  {
    files: ['cypress/api/**/*.spec.ts'],
    rules: {
      // В тестовых файлах разрешаем использование any, так как иногда это необходимо
      '@typescript-eslint/no-explicit-any': 'off',
      // Разрешаем длинные функции в тестах
      'max-lines-per-function': 'off',
    },
  },

  // Правила для файлов поддержки Cypress
  {
    files: ['cypress/support/**/*.ts'],
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },

  //?
  {
    files: ['cypress/support/apiClients/*.ts'],
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
];
