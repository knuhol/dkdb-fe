const faker = require('faker');
const times = require('lodash/times');
const random = require('lodash/random');
const cloneDeep = require('lodash/cloneDeep');

const { TOTAL, YEARS } = require('./fakeDataConfig');

const capitalize = s => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const generateRandomArray = (options, max = options.length) => {
  const array = cloneDeep(options);
  return times(random(1, max), () => {
    const randomIndex = random(0, array.length - 1);
    const item = cloneDeep(array[randomIndex]);
    array.splice(randomIndex, 1);
    return item;
  });
};

const fakeAuthors = times(TOTAL.AUTHORS, () => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
}));
const fakeTags = times(8, index => ({ id: index, name: capitalize(faker.lorem.word()) }));
const fakePublishers = times(TOTAL.PUBLISHERS, () => faker.company.companyName());
const fakeLanguages = times(TOTAL.LANGUAGES, () => faker.lorem.word());

const authors = () => generateRandomArray(fakeAuthors, TOTAL.CO_AUTHORS);
const tags = () => generateRandomArray(fakeTags);

const book = index => ({
  id: index,
  title: capitalize(faker.lorem.words(random(1, 5))),
  authors: authors(),
  yearOfIssue: faker.date.between(new Date(YEARS.MIN_YEAR_OF_ISSUE, 1), new Date()).getFullYear(),
  dateOfAddition: faker.date
    .between(new Date(YEARS.MIN_YEAR_OF_ADDITION, 1), new Date())
    .toISOString()
    .substring(0, 10),
  imageURL: 'https://picsum.photos/75/100',
  tags: tags(),
  description: faker.lorem.paragraphs(random(1, 5)),
  ISBN: faker.random.uuid(),
  numberOfPages: random(150, 600),
  originalLanguage: fakeLanguages[random(0, fakeLanguages.length)],
  publisher: fakePublishers[random(0, fakePublishers.length)],
  links: {
    goodreads: `https://www.goodreads.com/${random(10000, 99999)}`,
    cbdb: `https://cbdb.cz/${random(10000, 99999)}`,
    databazeKnih: `https://databazeknih.cz/${random(10000, 99999)}`,
  },
});

const books = times(TOTAL.BOOKS, index => book(index));

module.exports = { books };
