const path = require('path')

module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript'
  ],
  overrides: [],
  parserOptions: {
    project: path.join(__dirname, 'tsconfig.json'),
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}
