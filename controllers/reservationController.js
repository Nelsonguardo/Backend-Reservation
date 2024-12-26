const { Op } = require('sequelize');
const Reservation = require('../models/reservationModel');
const sequelize = require('../dataBase/connection');

const listAllReservation = async (req, res) => {
    try {
        const userId = req.user.id;
        const isAdmin = req.user.admin;

        if (isAdmin) {
            const reservations = await sequelize.query(
                "SELECT reservations.id, reservations.user_name, reservations.user_last_name, shared_areas.name AS space_name, time_slots.date, time_slots.start_time, time_slots.end_time, shared_areas.description, shared_areas.location FROM sapco.reservations INNER JOIN shared_areas ON reservations.space_id = shared_areas.id INNER JOIN time_slots ON reservations.time_slot_id = time_slots.id ORDER BY shared_areas.id;",
                {
                    type: sequelize.QueryTypes.SELECT
                }
            );
            return res.status(200).json({
                status: "success",
                data: reservations
            });
        }

        const reservations = await sequelize.query(
            "SELECT reservations.id, reservations.user_name, reservations.user_last_name, shared_areas.name AS space_name, time_slots.date, time_slots.start_time, time_slots.end_time, shared_areas.description, shared_areas.location FROM sapco.reservations INNER JOIN shared_areas ON reservations.space_id = shared_areas.id INNER JOIN time_slots ON reservations.time_slot_id = time_slots.id  WHERE reservations.user_create =" + userId + " ORDER BY shared_areas.id;",
            {
                type: sequelize.QueryTypes.SELECT
            }
        );

        return res.status(200).json({
            status: "success",
            data: reservations,
            user: userId
        });

    } catch (error) {
        console.error('Error al traer las reservas:', error);
        return res.status(500).json({
            status: "error",
            message: 'Error al traer las reservas'
        });
    }
};

const listAviabaleReservation = async (req, res) => {
    try {

        const reservations = await sequelize.query(
            "SELECT sa.id AS space_id,  ts.id AS schedule_id ,sa.name, ts.date, ts.start_time, ts.end_time, sa.description, sa.capacity, sa.location, sa.type FROM shared_areas sa JOIN time_slots ts ON NOT EXISTS (SELECT 1 FROM reservations r WHERE r.space_id = sa.id AND r.time_slot_id = ts.id) WHERE NOT EXISTS (SELECT 1 FROM reservations r WHERE r.space_id = sa.id AND r.time_slot_id = ts.id)  ORDER BY ts.id, ts.date, ts.start_time;",
            {
                type: sequelize.QueryTypes.SELECT
            }
        );
        return res.status(200).json({
            status: "success",
            data: reservations
        });

    } catch (error) {
        console.error('Error al traer las reservas disponibles:', error);
        return res.status(500).json({
            status: "error",
            message: 'Error al traer las reservas disponibles'
        });
    }
}

const createReservation = async (req, res) => {
    try {
        const {space_id, time_slot_id, user_name, user_last_name, user_email, number_phone } = req.body;
        const createdAt = new Date();
        const updatedAt = new Date();

        if ( !space_id || !time_slot_id || !user_name || !user_last_name || !user_email || !number_phone) {
            return res.status(400).json({
                status: "error",
                message: 'Todos los campos son obligatorios'
            });
        }

        const reservationExists = await Reservation.findOne({
            where: {
                [Op.and]: [
                    {user_create: req.user.id},
                    // { space_id: space_id },
                    { time_slot_id: time_slot_id }
                ]
            }
        });

        if (reservationExists) {
            return res.status(400).json({
                status: "error",
                message: 'El usuario ya tiene una reserva en el horario seleccionado'
            });
        }

        const reservation = await Reservation.create({space_id, time_slot_id,  user_name, user_last_name, user_email, number_phone, user_create: req.user.id, createdAt, updatedAt });
        return res.status(200).json({
            status: "success",
            data: reservation
        })
    } catch (error) {
        console.error('Error al crear la reserva:', error);
        return res.status(500).json(
            {
                status: "error",
                message: 'Error al crear la reserva'
            }
        );
    }
};

const cancelReservation = async (req, res) => {
    try {
        let id = req.params.id;

        const reservation = await Reservation.findByPk(id);
        if (!reservation) {
            return res.status(404).json({
                status: "error",
                message: 'Reserva no encontrada'
            });
        }

        await reservation.destroy();
        return res.status(200).json({
            status: "success",
            message: 'Reserva cancelada correctamente'
        })
    } catch (error) {
        console.error('Error al cancelar la reserva:', error);
        return res.status(500).json(
            {
                status: "error",
                message: 'Error al cancelar la reserva'
            }
        );
    }
};

module.exports = {
    listAllReservation,
    createReservation,
    cancelReservation,
    listAviabaleReservation
};
