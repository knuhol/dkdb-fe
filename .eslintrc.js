module.exports = {
  extends: [
    'react-app',
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/react',
    'prettier/@typescript-eslint',
  ],
  plugins: ['prettier', '@typescript-eslint'],
  rules: {
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
    'import/prefer-default-export': 0,
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'spaced-comment': ['error', 'always', { markers: ['/'] }],
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
};
