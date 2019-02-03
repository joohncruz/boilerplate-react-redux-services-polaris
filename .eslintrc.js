module.exports = {
  parser: 'babel-eslint',
  settings: {
    react: {
      createClass: 'createReactClass',
      pragma: 'React',
      version: '16.4',
    },
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },
  env: {
    browser: true,
    jest: true,
    es6: true,
    node: true,
  },
  extends: ['airbnb'],
  plugins: ['react', 'jsx-a11y', 'import'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'linebreak-style': 'off',
    'react/jsx-one-expression-per-line': 'off',
    indent: ['error', 2, { SwitchCase: 1 }],
    'max-len': [
      'warn',
      {
        code: 100,
        tabWidth: 2,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.js', 'jsx'],
      },
    ],
    'global-require': 'off',
    'react/forbid-prop-types': ['error', { forbid: ['any'] }],
    'import/no-dynamic-require': 'off',
  }
};
