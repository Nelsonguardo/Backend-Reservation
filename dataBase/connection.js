const { Sequelize } = require('sequelize');

// Configura tus parámetros de conexión
const sequelize = new Sequelize('sapco', 'root', 'admin', {
    host: 'localhost',
    dialect: 'mysql'
});



// Exporta la instancia de Sequelize para usarla en otros archivos
module.exports = sequelize;
