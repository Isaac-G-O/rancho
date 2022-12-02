const express = require('express');
const Scripts = require('../controllers/scripts');
const router = express.Router();

// login
router.post('', Scripts.validarUsuario);

module.exports = router;