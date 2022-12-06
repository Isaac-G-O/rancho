const express = require('express');
const Scripts = require('../controllers/scripts');
const router = express.Router();

// login
router.post('/validar-usuario', Scripts.validarUsuario);
router.get('/query1', Scripts.query1);
router.get('/query2', Scripts.query2);
router.get('/query3', Scripts.query3);
router.get('/query4', Scripts.query4);
router.get('/query5', Scripts.query5);

module.exports = router;