module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
    mocha: true,
    es6: true,
  },
  parser: "babel-eslint",
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    semi: ['error', 'always'],
    'no-unused-vars': ['off'],
    'keyword-spacing': 2,
  },
};
