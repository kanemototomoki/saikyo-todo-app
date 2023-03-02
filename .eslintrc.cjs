module.exports = {
  env: {
    browser: true,
    es2021: true,
    'jest/globals': true
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier'
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    ecmaFeatures: {
      jsx: true
    },
    sourceType: 'module',
    project: true,
    tsconfigRootDir: __dirname
  },
  root: true,
  plugins: [
    'react',
    'react-hooks',
    '@typescript-eslint',
    'jest',
    'jest-dom',
    'testing-library'
  ],
  ignorePatterns: ['*.js', '*.cjs', '**/vite-env.d.ts', '**/stories/*'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'off'
  }
}
