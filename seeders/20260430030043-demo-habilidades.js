'use strict';
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const habilidades = Array.from ({length: 10}).map(() => ({
      nombre: faker.word.adjective() + ' ' + faker.word.noun(),
      descripcion: faker.lorem.sentence(),
      incremento_ataque: faker.number.int({min: 0, max: 20}),
      incremento_defensa: faker.number.int({min: 0, max: 20}),
      incremento_estamina: faker.number.int({min: 0, max: 20}),
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    await queryInterface.bulkInsert('Habilidades', habilidades);
    },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Habilidades', null, {});
  }
};