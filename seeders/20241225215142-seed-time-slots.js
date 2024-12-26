'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const date = '2024-12-24'; // Fecha específica
    const spaceId = 1; // ID del espacio

    const slots = [];
    for (let hour = 12; hour < 20; hour++) {
      slots.push({
        date: date,
        start_time: `${hour}:00:00`,
        end_time: `${hour + 1}:00:00`,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    return queryInterface.bulkInsert('Time_slots', slots, {});
  },

  down: async (queryInterface, Sequelize) => {
    // Elimina los horarios generados en este Seeder
    return queryInterface.bulkDelete('Time_slots', {
      date: '2024-12-24',
      space_id: 1,
    }, {});
  },
};
