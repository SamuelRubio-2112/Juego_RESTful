'use strict';
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const perfiles = Array.from ({length: 10}).map((_, i) => ({
      biografia: faker.lorem.sentence(),
      avatar: faker.image.avatar(),
      usuarioId: i + 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    await queryInterface.bulkInsert('Perfils', perfiles);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Perfils', null, {});
  }
};
