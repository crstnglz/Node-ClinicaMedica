'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('citas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_paciente: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: { tableName: 'pacientes' },
          key: 'id'
        }
      },
      id_medico: {
        type: Sequelize.INTEGER,
        allowNull: false, 
        references: {
          model: { tableName: 'usuarios' },
          key: 'id'
        }
      },
      fecha: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      hora: {
        type: Sequelize.TIME,
        allowNull: false
      },
      duracion_min: {
        type: Sequelize.INTEGER,
        defaultValue: 30
      },
      estado: {
        type: Sequelize.ENUM('pendiente', 'en_curso', 'finalizada', 'cancelada'),
        defaultValue: 'pendiente'
      },
      motivo: {
        type: Sequelize.STRING
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('citas');
  }
};
