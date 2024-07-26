const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rota para login de médicos
router.post('/login/doctor', authController.loginDoctor);

// Rota para login de pacientes
router.post('/login/patient', authController.loginPatient);

module.exports = router;
