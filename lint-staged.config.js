module.exports = {
  '*.{js,ts,tsx}': ['npm run lint -- --fix', 'git add', 'npm run test -- --findRelatedTests'],
};
