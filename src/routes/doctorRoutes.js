const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');
const authMiddleware = require('../middlewares/authMiddleware');

// Rota para cadastrar horários disponíveis
router.post('/schedule', /*authMiddleware.verifyToken,*/ doctorController.editAvailableHours);

// Rota para editar horários disponíveis
router.put('/schedule/:slotId', /*authMiddleware.verifyToken,*/ doctorController.editAvailableHours);

// Rota para aceitar uma consulta
router.post('/accept/:appointmentId', /*authMiddleware.verifyToken,*/ doctorController.handleAppointment);

// Rota para recusar uma consulta
router.post('/reject/:appointmentId', /*authMiddleware.verifyToken,*/ doctorController.handleAppointment);

module.exports = router;
