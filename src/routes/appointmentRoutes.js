const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const authMiddleware = require('../middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Appointments
 *   description: Gerenciamento de consultas
 */

/**
 * @swagger
 * /appointments/schedule:
 *   post:
 *     summary: Agendar uma nova consulta
 *     tags: [Appointments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               doctorId:
 *                 type: string
 *                 description: ID do médico
 *               patientId:
 *                 type: string
 *                 description: ID do paciente
 *               date:
 *                 type: string
 *                 format: date-time
 *                 description: Data e hora da consulta
 *     responses:
 *       200:
 *         description: Consulta agendada com sucesso
 *       400:
 *         description: Requisição inválida
 *       500:
 *         description: Erro ao agendar a consulta
 */
router.post('/schedule', /*authMiddleware.verifyToken, */appointmentController.scheduleAppointment);

/**
 * @swagger
 * /appointments/doctor/{doctorId}:
 *   get:
 *     summary: Obter todas as consultas de um médico
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do médico
 *     responses:
 *       200:
 *         description: Lista de consultas do médico
 *       400:
 *         description: Requisição inválida
 *       500:
 *         description: Erro ao obter as consultas
 */
router.get('/doctor/:doctorId', /*authMiddleware.verifyToken, */appointmentController.getDoctorAppointments);

/**
 * @swagger
 * /appointments/patient/{patientId}:
 *   get:
 *     summary: Obter todas as consultas de um paciente
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: patientId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do paciente
 *     responses:
 *       200:
 *         description: Lista de consultas do paciente
 *       400:
 *         description: Requisição inválida
 *       500:
 *         description: Erro ao obter as consultas
 */
router.get('/patient/:patientId', /*authMiddleware.verifyToken, */appointmentController.getPatientAppointments);

/**
 * @swagger
 * /appointments/cancel/{appointmentId}:
 *   post:
 *     summary: Cancelar uma consulta
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: appointmentId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da consulta
 *     responses:
 *       200:
 *         description: Consulta cancelada com sucesso
 *       400:
 *         description: Requisição inválida
 *       500:
 *         description: Erro ao cancelar a consulta
 */
router.post('/cancel/:appointmentId', /*authMiddleware.verifyToken, */appointmentController.cancelAppointment);

module.exports = router;
