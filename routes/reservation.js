const express = require('express')
const router = express.Router();
const check = require('../middlewares/auth');

const {
    listAviabaleReservation,
    listAllReservation,
    createReservation,
    cancelReservation,
} = require('../controllers/reservationController');

router.get('/available', check.auth, listAviabaleReservation);
router.get('/', check.auth, listAllReservation);
router.post('/', check.auth, createReservation);
router.delete('/:id', check.auth, cancelReservation);

module.exports = router