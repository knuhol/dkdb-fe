module.exports = {
  '*.js': ['npm run lint -- --fix', 'git add', 'npm run test -- --findRelatedTests'],
};
