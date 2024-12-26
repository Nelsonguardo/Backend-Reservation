const sequelize = require('../dataBase/connection');
const {DataTypes} = require('sequelize');

const Reservation = sequelize.define('Reservation', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    space_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    time_slot_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    user_name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },  
    user_last_name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    user_email: {
        type: DataTypes.STRING(255),
        allowNull: false

    }, number_phone: {
        type: DataTypes.INTEGER(10),
        allowNull: false
    },
    user_create: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
    },
    updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
    },                          
}, {
    timestamps: false,
});

module.exports = Reservation