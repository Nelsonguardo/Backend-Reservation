const sequelize = require('../dataBase/connection');
const { DataTypes } = require('sequelize');

const Shared_area = sequelize.define('Shared_area', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    capacity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    location: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    type: {
        type: DataTypes.STRING(255),
        allowNull: true     // Puedes agregar un campo para el tipo de espacio (por ejemplo: sala de reuniones, oficina, etc.)  
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
    },
    updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
    },
},
    {
        timestamps: false
    }
);

module.exports = Shared_area
