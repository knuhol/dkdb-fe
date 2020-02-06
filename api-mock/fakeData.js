const faker = require('faker');
const times = require('lodash/times');
const random = require('lodash/random');
const cloneDeep = require('lodash/cloneDeep');
const find = require('lodash/find');
const slugify = require('slugify');

const { TOTAL, YEARS, BOOK_SIZES } = require('./fakeDataConfig');

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
    if (Object.prototype.hasOwnProperty.call(item, 'data')) {
      item.meta.booksMatchesValue += 1;
      // eslint-disable-next-line no-param-reassign
      options[randomIndex].meta.booksMatchesValue += 1;
      return item.data;
    }
    return item;
  });
};

const fakeAuthors = times(TOTAL.AUTHORS, () => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
}));
const colors = ['red', 'orange', 'blue', 'green', 'yellow', 'purple'];
const fakeTags = times(TOTAL.TAGS, index => {
  const name = capitalize(faker.lorem.word());
  return {
    data: { slug: `${slugify(name.toLocaleLowerCase())}`, name, color: colors[index % colors.length] },
    meta: { booksMatchesValue: 0 },
  };
});
const fakePublishers = times(TOTAL.PUBLISHERS, () => faker.company.companyName());
const fakeLanguages = times(TOTAL.LANGUAGES, () => {
  const name = slugify(faker.lorem.word().toLowerCase());
  // simplified; use name as a slug as well so we can search directly by it
  return { slug: name, name, booksMatchesValue: 0 };
});

const authors = () => generateRandomArray(fakeAuthors, TOTAL.CO_AUTHORS);
const tags = () => generateRandomArray(fakeTags);
let countShortBooks = 0;
let countMiddleBooks = 0;
let countLongBooks = 0;

const book = index => {
  const title = capitalize(faker.lorem.words(random(1, 5)));
  const yearOfIssue = faker.date.between(new Date(YEARS.MIN_YEAR_OF_ISSUE, 1), new Date()).getFullYear();
  const numberOfPages = random(50, 600);
  const originalLanguage = fakeLanguages[random(0, fakeLanguages.length - 1)].name;

  if (numberOfPages < BOOK_SIZES.SIZE.SHORT) {
    countShortBooks += 1;
  } else if (numberOfPages < BOOK_SIZES.SIZE.MIDDLE) {
    countMiddleBooks += 1;
  } else {
    countLongBooks += 1;
  }

  find(fakeLanguages, ['name', originalLanguage]).booksMatchesValue += 1;

  return {
    slug: slugify(`${title.toLocaleLowerCase()}-${yearOfIssue}`),
    title,
    authors: authors(),
    yearOfIssue,
    dateOfAddition: faker.date
      .between(new Date(YEARS.MIN_YEAR_OF_ADDITION, 1), new Date())
      .toISOString()
      .substring(0, 10),
    imageURL: `https://loremflickr.com/375/500?random=${index}`,
    tags: tags(),
    description: faker.lorem.paragraphs(random(1, 5)),
    isbn: faker.random.uuid(),
    numberOfPages,
    originalLanguage,
    publisher: fakePublishers[random(0, fakePublishers.length - 1)],
    links: {
      goodreads: `https://www.goodreads.com/${random(10000, 99999)}`,
      cbdb: `https://cbdb.cz/${random(10000, 99999)}`,
      databazeKnih: `https://databazeknih.cz/${random(10000, 99999)}`,
    },
  };
};

const books = times(TOTAL.BOOKS, index => book(index));

const filterParams = {
  originalLanguage: fakeLanguages,
  bookSize: [
    {
      slug: BOOK_SIZES.SLUG.SHORT,
      maxPages: BOOK_SIZES.SIZE.SHORT,
      booksMatchesValue: countShortBooks,
      name: 'krátká',
    },
    {
      slug: BOOK_SIZES.SLUG.MIDDLE,
      minPages: BOOK_SIZES.SIZE.SHORT,
      maxPages: BOOK_SIZES.SIZE.MIDDLE,
      booksMatchesValue: countMiddleBooks,
      name: 'střední',
    },
    {
      slug: BOOK_SIZES.SLUG.LONG,
      minPages: BOOK_SIZES.SIZE.MIDDLE,
      booksMatchesValue: countLongBooks,
      name: 'dlouhá',
    },
  ],
  tags: fakeTags.map(tag => ({
    slug: tag.data.slug,
    name: tag.data.name,
    booksMatchesValue: tag.meta.booksMatchesValue,
  })),
};

const info = {
  dateOfLastBookAddition: new Date().toISOString().substring(0, 10),
  totalBooks: books.length,
};

module.exports = { books, filterParams, info };
