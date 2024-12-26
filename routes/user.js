const express = require('express')
const router = express.Router();
const check = require('../middlewares/auth');

const {
    listarUser,
    listarOneUser,
    login
} = require('../controllers/userController');

router.get('/', check.auth, listarUser);
router.post("/login", login);
router.get("/:id", check.auth,listarOneUser);



module.exports = router