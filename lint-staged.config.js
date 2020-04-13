module.exports = {
  '*.{js,ts,tsx}': ['npm run lint:no-path -- --fix', 'git add', 'npm run test -- --findRelatedTests'],
};
