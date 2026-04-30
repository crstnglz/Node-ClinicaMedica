'use strict';
const { genPacientes } = require('../factories/pacienteFactory.cjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const pacientes = genPacientes(20);
    await queryInterface.bulkInsert('pacientes', pacientes, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('pacientes', null, {});
  }
};
