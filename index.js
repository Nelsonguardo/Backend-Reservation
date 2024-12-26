const express = require('express');
const cors = require('cors');
const sequelize = require('./dataBase/connection'); // Importa la instancia de Sequelize

const app = express();
const puerto = 3002;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const usersRouter = require('./routes/user');
const reservationsRouter = require('./routes/reservation');


app.use('/api/users', usersRouter);
app.use('/api/reservations', reservationsRouter);

app.get("/ruta-prueba", (req, res) => {
    return res.status(200).json(
        {
            message: "Hola mundo",
            nombre: "Pablo",
            apellido: "Perez",
            edad: 25
        }
    );
});

const server = app.listen(puerto, async () => {
    try {
        await sequelize.authenticate();  // Verifica la conexión a la base de datos
        console.log('Conexión a la base de datos establecida con éxito.');
        console.log(`Servidor corriendo en el puerto ${puerto}`);
    } catch (error) {
        console.error('Error al conectar con la base de datos:', error);
    }
});

// Manejo del cierre del servidor
const shutdown = async () => {
    console.log('Cerrando el servidor...');
    try {
        await sequelize.close();  // Cierra la conexión a la base de datos
        console.log('Conexión a la base de datos cerrada.');
    } catch (error) {
        console.error('Error al cerrar la conexión con la base de datos:', error);
    } finally {
        process.exit(0);  // Finaliza el proceso
    }
};

// Captura señales de terminación para cerrar el servidor
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);