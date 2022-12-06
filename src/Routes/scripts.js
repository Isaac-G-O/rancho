const express = require('express');
const Scripts = require('../controllers/scripts');
const router = express.Router();

// login
router.post('/validar-usuario', Scripts.validarUsuario);
router.get('/query1', Scripts.query1);

module.exports = router;