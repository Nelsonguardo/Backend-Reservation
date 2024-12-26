const User = require('../models/userModel');
const jwt = require('../services/jwt');
const bcrypt = require('bcrypt');
//const { Op } = require('sequelize');
//const validate = require('../helpers/validate');


const listarUser = async (req, res) => {
    try {
        const users = await User.findAll({
            order: [['name', 'ASC']]
        });
        return res.status(200).json({
            status: "success",
            data: users
        })
    } catch (error) {
        console.error('Error al traer los usuarios:', error);
        return res.status(500).json(
            {
                status: "error",
                message: 'Error al traer los usuarios'
            }
        );
    }
};

const listarOneUser = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json(
                {
                    status: "error",
                    message: 'El id es obligatorio'
                }
            );
        }

        const user = await User.findOne({
            where: {
                id: id
            }
        });

        return res.status(200).json(
            {
                status: "success",
                data: user
            }
        );
    } catch (error) {
        console.error('Error al traer usuario:', error);
        return res.status(500).json(
            {
                status: "error",
                message: 'Error al traer los usuarios'
            }
        )
    }
};

const login = async (req, res) => {
    try {
        // Recoger datos de la petición
        let params = req.body;
        if (!params.email || !params.password) {
            return res.status(400).send({
                status: "error",
                message: "Faltan datos por enviar"
            });
        }
        // Buscar en la base de datos si coincide con el email y la password
        const user = await User.findOne({
            where: {
                EMAIL: params.email.toLowerCase()
            }
        });
        if (!user) {
            return res.status(404).send({
                status: "error",
                message: "Usuario no existe"
            });
        }
        // comprobar la password
        const pwd = bcrypt.compareSync(params.password, user.password);
        if (!pwd) {
            return res.status(400).send({
                status: "error",
                message: "La password es incorrecta"
            })
        }
        //Devolver token
        const token = jwt.createToken(user);
        //Devolver datos del usuario
        return res.status(200).send({
            status: "success",
            message: "Te has logueado correctamente",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
            token
        });
    } catch (error) {
        return res.status(500).send({
            status: "error",
            message: "Error interno del servidor"
        });
    }
};

module.exports = {
    listarUser,
    listarOneUser,
    login
}