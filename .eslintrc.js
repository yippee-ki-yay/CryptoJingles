const path = require('path');

module.exports = {
  extends: [
    'airbnb',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:react-hooks/recommended',
  ],
  plugins: ['import'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  env: {
    es6: true,
    browser: true,
  },
  rules: {
    'max-len': 0,
    'class-methods-use-this': 0,
    'jsx-a11y/href-no-hash': 'off',
    'jsx-a11y/no-autofocus': 0,
    'react/jsx-tag-spacing': 1,
    'no-unused-vars': 0,
    'react/no-danger': 0,
    'no-underscore-dangle': 0,
    'global-require': 0,
    'no-console': 0,
    'new-cap': 0,
    'eol-last': 0,
    'jsx-a11y/label-has-for': 0,
    'linebreak-style': 0,
    'consistent-return': 0,
    'react/forbid-prop-types': 0,
    'import/prefer-default-export': 0,
    'no-unescaped-entities': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'no-shadow': 0,
    'prefer-promise-reject-errors': 0,
    'function-paren-newline': 0,
    'react/destructuring-assignment': 0,
    'react/jsx-one-expression-per-line': 0,
    'react/jsx-props-no-spreading': 0,
    'operator-linebreak': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'jsx-a11y/label-has-associated-control': 0,
    'no-nested-ternary': 0,
    'import/no-cycle': 0,
    'template-curly-spacing': 'off',
    indent: ['error', 2, {
      ignoredNodes: ['TemplateLiteral'],
    }],
  },
  globals: {
    web3: true,
    ethereum: true,
    $: true,
    window: true,
    document: true,
    fetch: true,
    location: true,
    localStorage: true,
  },
  settings: {
    'import/resolver': {
      [path.resolve(__dirname, 'node_modules/eslint-import-resolver-webpack')]: {
        config: path.resolve(__dirname, './config/webpack.dev.config.js'),
        alias: {
          map: [
            // ['translate', path.resolve(__dirname, './src/services/translate/translate.jsx')],
          ],
        },
      },
    },
  },
};
