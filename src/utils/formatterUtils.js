// @flow
const dateFormatter = {
  format: (date: Date) => `${date.getDate()}. ${date.getMonth() + 1}. ${date.getFullYear()}`,
};

export { dateFormatter };
