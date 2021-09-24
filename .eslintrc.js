module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
  parserOptions: { ecmaVersion: 2019, sourceType: 'module' },
  env: {
    node: true,
  },
  rules: {
    'no-console': 2,
  },
};
