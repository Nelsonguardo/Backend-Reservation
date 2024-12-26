//Importar dependencias
const jwt = require('jwt-simple');
const moment = require('moment');

//Clave secreta
const secret = 'CLAVE_SECRETA_DE_PRACTICA_DE_API_REST_NELSON_231199';

//Crear una función para generar el token
const createToken = (user) => {
    const payload = {
        id: user.id,
        name: user.name,
        last_name: user.last_name,
        email: user.email,
        admin: user.admin,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        iat: moment().unix(),
        exp: moment().add(1, 'days').unix()
    };
    //Devolver el token
    return jwt.encode(payload, secret);
}

module.exports = {
    createToken,
    secret
}