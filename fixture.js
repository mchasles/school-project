const faker = require('faker');
const _ = require('lodash');

module.exports = () => {
  return {
    students: _.times(20, n => ({
      id: n,
      name: faker.name.firstName(),
      avatar: faker.image.avatar(),
    })),
  };
};