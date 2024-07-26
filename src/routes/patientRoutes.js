const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const appointmentController = require('../controllers/appointmentController');
const authMiddleware = require('../middlewares/authMiddleware');

// Rota para visualizar o prontuário eletrônico do paciente
router.get('/record', /*authMiddleware.verifyToken,*/ patientController.getMedicalRecords);//

// Rota para fazer upload de arquivos no prontuário eletrônico do paciente
router.post('/record/upload', /*authMiddleware.verifyToken,*/ patientController.uploadMedicalRecords);//

// Rota para buscar médicos disponíveis
router.get('/doctors', /*authMiddleware.verifyToken,*/ patientController.searchDoctors);//

// Rota para agendar uma consulta
router.post('/appointment', /*authMiddleware.verifyToken,*/ appointmentController.scheduleAppointment);

// Rota para cancelar uma consulta
router.post('/appointment/cancel/:appointmentId', /*authMiddleware.verifyToken,*/ appointmentController.cancelAppointment);

module.exports = router;
