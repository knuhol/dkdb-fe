module.exports = {
  hooks: {
    'commit-msg': 'node ./scripts/commit-msg.js -E HUSKY_GIT_PARAMS',
    'pre-commit': 'npm run flow && lint-staged',
    'pre-push': 'npm run pipeline:test',
  },
};
