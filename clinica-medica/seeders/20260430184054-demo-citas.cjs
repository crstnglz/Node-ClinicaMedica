'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('citas', [
      {
        id_paciente: 1, 
        id_medico: 1,
        fecha: new Date().toISOString().split('T')[0],
        hora: '09:00:00',
        duracion_min: 30,
        estado: 'pendiente',
        motivo: 'Revisión general'
      },
      {
        id_paciente: 2,
        id_medico: 1,
        fecha: new Date().toISOString().split('T')[0],
        hora: '10:00:00',
        duracion_min: 45,
        estado: 'pendiente',
        motivo: 'Consulta dolor de cabeza'
      },
      {
        id_paciente: 3, 
        id_medico: 2,
        fecha: new Date().toISOString().split('T')[0],
        hora: '11:00:00',
        duracion_min: 30,
        estado: 'finalizada',
        motivo: 'Control tensión'
      },
      {
        id_paciente: 4,
        id_medico: 2,
        fecha: new Date().toISOString().split('T')[0],
        hora: '12:00:00',
        duracion_min: 60,
        estado: 'cancelada',
        motivo: 'Revisión analítica'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('citas', null, {});
  }
};
