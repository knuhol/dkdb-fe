module.exports = {
  extends: ['react-app', 'airbnb', 'prettier', 'prettier/react', 'plugin:flowtype/recommended'],
  plugins: ['prettier', 'flowtype'],
  rules: {
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'import/prefer-default-export': 0,
    'react/prop-types': [2, { ignore: ['children'] }],
  },
};
