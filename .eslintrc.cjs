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
    'react/react-in-jsx-scope': 0,
    'react-hooks/rules-of-hooks': 2,
    'react-hooks/exhaustive-deps': 1,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/consistent-type-definitions': 0,
    '@typescript-eslint/ban-types': 0,
    // submitでエラーになるから設定
    '@typescript-eslint/no-misused-promises': [
      2,
      {
        checksVoidReturn: {
          attributes: false
        }
      }
    ],
    '@typescript-eslint/no-unsafe-assignment': 0,
    '@typescript-eslint/no-unsafe-call': 0,
    '@typescript-eslint/strict-boolean-expressions': 0,
    '@typescript-eslint/no-unsafe-member-access': 0,
    "@typescript-eslint/prefer-nullish-coalescing": 0
  }
}
