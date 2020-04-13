module.exports = {
  '*.{js,ts,tsx}': ['npm run lint:no-path -- --fix', 'npm run test -- --findRelatedTests'],
};
