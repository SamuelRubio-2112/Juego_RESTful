'use strict';
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const personajes = Array.from({length: 10}).map(() => ({
      nombre: faker.person.firstName(),
      descripcion: faker.lorem.sentence(),
      ataque: faker.number.int({min: 1, max: 10}),
      defensa: faker.number.int({min: 1, max: 10}),
      estamina: faker.number.int({min: 1, max: 10}),
      perfilId: faker.number.int({min: 1, max: 10}),
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    await queryInterface.bulkInsert('Personajes', personajes);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Personajes', null, {});
  }
};