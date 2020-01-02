module.exports = {
  hooks: {
    'commit-msg': 'node ./scripts/commit-msg.js -E HUSKY_GIT_PARAMS',
    'pre-commit': 'lint-staged',
    'pre-push': 'npm run lint && npm run test:coverage',
  },
};
