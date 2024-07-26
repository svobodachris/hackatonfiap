const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const authMiddleware = require('../middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Agendamentos
 *   description: API para gerenciar consultas médicas
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ScheduleAppointment:
 *       type: object
 *       required:
 *         - doctorId
 *         - patientId
 *         - date
 *       properties:
 *         doctorId:
 *           type: string
 *           description: ID do médico
 *         patientId:
 *           type: string
 *           description: ID do paciente
 *         date:
 *           type: string
 *           format: date-time
 *           description: Data e hora da consulta
 *       example:
 *         doctorId: 60d21ba67c213e6a96198f8b
 *         patientId: 60d21bb67c213e6a96198f8d
 *         date: 2024-08-15T14:30:00Z
 */
router.post('/schedule', /*authMiddleware.verifyToken, */appointmentController.scheduleAppointment);

/**
 * @swagger
 * /doctor/{id}:
 *   get:
 *     summary: Retorna um médico pelo ID
 *     tags: [Doctor]
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do médico
 *     responses:
 *       200:
 *         description: Médico encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Doctor'
 *       404:
 *         description: Médico não encontrado
 */
router.get('/doctor/:doctorId', /*authMiddleware.verifyToken, */appointmentController.getDoctorAppointments);

/**
 * @swagger
 * /patient/{id}:
 *   get:
 *     summary: Retorna um paciente pelo ID
 *     tags: [Patient]
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do paciente
 *     responses:
 *       200:
 *         description: Paciente encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Patient'
 *       404:
 *         description: Paciente não encontrado
 */
router.get('/patient/:patientId', /*authMiddleware.verifyToken, */appointmentController.getPatientAppointments);

/**
 * @swagger
 * /appointments/{id}:
 *   get:
 *     summary: Retorna uma consulta pelo ID
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da consulta
 *     responses:
 *       200:
 *         description: Consulta encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Appointment'
 *       404:
 *         description: Consulta não encontrada
 */
router.post('/cancel/:appointmentId', /*authMiddleware.verifyToken, */appointmentController.cancelAppointment);

module.exports = router;
