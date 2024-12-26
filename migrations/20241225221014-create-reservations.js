'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Reservations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      space_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'shared_areas', // Nombre de la tabla `spaces`
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      time_slot_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'time_slots', // Nombre de la tabla `time_slots`
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      user_name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      user_last_name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      user_email: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      number_phone: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      user_create: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Reservations');
  },
};
