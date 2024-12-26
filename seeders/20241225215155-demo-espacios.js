'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Shared_areas', [{
      name: 'Sala de Reuniones 1',
      description: 'Espacio para reuniones de trabajo.',
      capacity: 10,
      location: 'Edificio A, Piso 1',
      type: 'Sala de reuniones',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: 'Oficina 2',
      description: 'Oficina privada para trabajo individual.',
      capacity: 1,
      location: 'Edificio A, Piso 2',
      type: 'Oficina',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Sala de Reuniones 3',
      description: 'Espacio para reuniones de trabajo.',
      capacity: 15,
      location: 'Edificio B, Piso 1',
      type: 'Sala de reuniones',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Oficina 4',
      description: 'Oficina privada para trabajo individual.',
      capacity: 1,
      location: 'Edificio B, Piso 2',
      type: 'Oficina',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Sala de Reuniones 5',
      description: 'Espacio para reuniones de trabajo.',
      capacity: 20,
      location: 'Edificio C, Piso 1',
      type: 'Sala de reuniones',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Oficina 6',
      description: 'Oficina privada para trabajo individual.',
      capacity: 1,
      location: 'Edificio C, Piso 2',
      type: 'Oficina',
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Shared_areas', null, {});
  }
};
