const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const authMiddleware = require('../middlewares/authMiddleware');

// Rota para agendar uma nova consulta
router.post('/schedule', /*authMiddleware.verifyToken, */appointmentController.scheduleAppointment);

// Rota para obter todas as consultas de um médico
router.get('/doctor/:doctorId', /*authMiddleware.verifyToken, */appointmentController.getDoctorAppointments);

// Rota para obter todas as consultas de um paciente
router.get('/patient/:patientId', /*authMiddleware.verifyToken, */appointmentController.getPatientAppointments);

// Rota para cancelar uma consulta
router.post('/cancel/:appointmentId', /*authMiddleware.verifyToken, */appointmentController.cancelAppointment);

module.exports = router;
