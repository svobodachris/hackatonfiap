const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const appointmentController = require('../controllers/appointmentController');
const authMiddleware = require('../middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Patients
 *   description: Rotas relacionadas aos pacientes
 */

/**
 * @swagger
 * /patient/record:
 *   get:
 *     summary: Visualizar o prontuário eletrônico do paciente
 *     tags: [Patients]
 *     responses:
 *       200:
 *         description: Prontuário eletrônico do paciente retornado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 records:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       type:
 *                         type: string
 *                       content:
 *                         type: string
 *       401:
 *         description: Token de autenticação inválido
 *       500:
 *         description: Erro ao recuperar prontuário eletrônico
 */
router.get('/record', /*authMiddleware.verifyToken,*/ patientController.getMedicalRecords);//

/**
 * @swagger
 * /patient/record/upload:
 *   post:
 *     summary: Fazer upload de arquivos no prontuário eletrônico do paciente
 *     tags: [Patients]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Arquivo do prontuário eletrônico para upload
 *     responses:
 *       200:
 *         description: Arquivo carregado com sucesso no prontuário eletrônico
 *       401:
 *         description: Token de autenticação inválido
 *       500:
 *         description: Erro ao carregar arquivo no prontuário eletrônico
 */
router.post('/record/upload', /*authMiddleware.verifyToken,*/ patientController.uploadMedicalRecords);//

/**
 * @swagger
 * /patient/doctors:
 *   get:
 *     summary: Buscar médicos disponíveis
 *     tags: [Patients]
 *     parameters:
 *       - in: query
 *         name: specialty
 *         schema:
 *           type: string
 *         description: Filtro por especialidade do médico
 *       - in: query
 *         name: distance
 *         schema:
 *           type: number
 *           format: float
 *         description: Filtro por distância em quilômetros
 *       - in: query
 *         name: rating
 *         schema:
 *           type: number
 *           format: float
 *         description: Filtro por avaliação do médico
 *     responses:
 *       200:
 *         description: Lista de médicos disponíveis retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   specialty:
 *                     type: string
 *                   distance:
 *                     type: number
 *                     format: float
 *                   rating:
 *                     type: number
 *                     format: float
 *       401:
 *         description: Token de autenticação inválido
 *       500:
 *         description: Erro ao buscar médicos disponíveis
 */
router.get('/doctors', /*authMiddleware.verifyToken,*/ patientController.searchDoctors);//

/**
 * @swagger
 * /patient/appointment:
 *   post:
 *     summary: Agendar uma consulta
 *     tags: [Patients]
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
 *               appointmentTime:
 *                 type: string
 *                 format: date-time
 *                 description: Hora e data da consulta
 *     responses:
 *       200:
 *         description: Consulta agendada com sucesso
 *       401:
 *         description: Token de autenticação inválido
 *       500:
 *         description: Erro ao agendar consulta
 */
router.post('/appointment', /*authMiddleware.verifyToken,*/ appointmentController.scheduleAppointment);

/**
 * @swagger
 * /patient/appointment/cancel/{appointmentId}:
 *   post:
 *     summary: Cancelar uma consulta
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: appointmentId
 *         required: true
 *         description: ID da consulta a ser cancelada
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Consulta cancelada com sucesso
 *       401:
 *         description: Token de autenticação inválido
 *       404:
 *         description: Consulta não encontrada
 *       500:
 *         description: Erro ao cancelar consulta
 */
router.post('/appointment/cancel/:appointmentId', /*authMiddleware.verifyToken,*/ appointmentController.cancelAppointment);

module.exports = router;
