'use strict';
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // 1. Creamos un array con 10 objetos de usuario ficticios
    const usuarios = Array.from({ length: 10 }).map(() => ({
      nombre: faker.internet.displayName(),
      correo: faker.internet.email(),
      contrasena: faker.internet.password(),
      createdAt: new Date(), // ¡OJO! Sequelize exige estas fechas en los seeders
      updatedAt: new Date(),
    }));

    // 2. Usamos bulkInsert para meterlos todos de un solo golpe
    // 'Usuarios' debe coincidir exactamente con el nombre de tu tabla
    await queryInterface.bulkInsert('Usuarios', usuarios);
  },

  async down (queryInterface, Sequelize) {
    // Borramos todo de la tabla Usuarios si queremos revertir
    await queryInterface.bulkDelete('Usuarios', null, {});
  }
};
