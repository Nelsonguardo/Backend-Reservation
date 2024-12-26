'use strict';

const bcrypt = require('bcrypt'); // Importa bcrypt

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const hashedPassword1 = await bcrypt.hash('contrasena1', 10); // Cambia 'contrasena1' por la contraseña real

    await queryInterface.bulkInsert('Users', [{
      name: 'Admin',
      last_name: 'Admin',
      email: 'admin@admin.com',
      password: hashedPassword1, // Asegúrate de encriptar la contraseña
      admin: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'User',
      last_name: 'User',
      email: 'user@user.com',
      password: hashedPassword1, // Asegúrate de encriptar la contraseña
      admin: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'User2',
      last_name: 'User2',
      email: 'user2@user2.com',
      password: hashedPassword1, // Asegúrate de encriptar la contraseña
      admin: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
