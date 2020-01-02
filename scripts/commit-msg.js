const fs = require('fs');
const chalk = require('chalk');
const { sync: parseCommitMsg } = require('conventional-commits-parser');
const { list } = require('../changelog.config');

const EXIT_CODES = {
  ERROR: 1,
  SUCCESS: 0,
};

const buildLogger = (iconToDisplay, color) => (input, { icon = true, bold = true } = {}) => {
  const prefix = icon ? chalk[color].bold(`${iconToDisplay}  `) : '';
  const msg = bold ? chalk.bold(input) : input;

  console.log(`${prefix}${chalk[color](msg)}`);
};

const logger = {
  error: buildLogger('✖', 'red'),
  info: buildLogger('ℹ', 'blue'),
  warn: buildLogger('⚠', 'yellow'),
};

const commitMsg = fs.readFileSync('.git/COMMIT_EDITMSG', { encoding: 'utf-8' });

// Custom check for normal commits: validates the usage of conventional commits standard
// Further reading: https://www.conventionalcommits.org
const { subject, type } = parseCommitMsg(commitMsg);

function footerMessage() {
  logger.warn('Current commit message:');
  logger.info(commitMsg, { icon: false, bold: false });
}

// Subject validation
// Can not be empty
// Has to start with lower case
if (!subject || subject.length === 0) {
  logger.error("Commit's subject can not be empty\n");
  footerMessage();
  process.exit(EXIT_CODES.ERROR);
}

if (!/^[a-z]/.test(subject[0])) {
  logger.error("Commit's subject first letter has to be in lower case\n");
  footerMessage();
  process.exit(EXIT_CODES.ERROR);
}

// Type validation
// Has to be one of supported types
if (!list.includes(type)) {
  logger.error(`Commit's type has to be one of following: ${list.join(', ')}.\n`);
  footerMessage();
  process.exit(EXIT_CODES.ERROR);
}

process.exit(EXIT_CODES.SUCCESS);
