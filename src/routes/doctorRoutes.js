const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');
const authMiddleware = require('../middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Doctors
 *   description: Rotas relacionadas aos médicos
 */

/**
 * @swagger
 * /doctor/schedule:
 *   post:
 *     summary: Cadastrar horários disponíveis
 *     tags: [Doctors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               startTime:
 *                 type: string
 *                 format: date-time
 *                 description: Hora de início do horário disponível
 *               endTime:
 *                 type: string
 *                 format: date-time
 *                 description: Hora de término do horário disponível
 *     responses:
 *       200:
 *         description: Horário disponível cadastrado com sucesso
 *       401:
 *         description: Token de autenticação inválido
 *       500:
 *         description: Erro ao cadastrar horário disponível
 */
router.post('/schedule', /*authMiddleware.verifyToken,*/ doctorController.editAvailableHours);

/**
 * @swagger
 * /doctor/schedule/{slotId}:
 *   put:
 *     summary: Editar horário disponível
 *     tags: [Doctors]
 *     parameters:
 *       - in: path
 *         name: slotId
 *         required: true
 *         description: ID do horário disponível a ser editado
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               startTime:
 *                 type: string
 *                 format: date-time
 *                 description: Nova hora de início do horário disponível
 *               endTime:
 *                 type: string
 *                 format: date-time
 *                 description: Nova hora de término do horário disponível
 *     responses:
 *       200:
 *         description: Horário disponível editado com sucesso
 *       401:
 *         description: Token de autenticação inválido
 *       404:
 *         description: Horário disponível não encontrado
 *       500:
 *         description: Erro ao editar horário disponível
 */
router.put('/schedule/:slotId', /*authMiddleware.verifyToken,*/ doctorController.editAvailableHours);

/**
 * @swagger
 * /doctor/accept/{appointmentId}:
 *   post:
 *     summary: Aceitar uma consulta
 *     tags: [Doctors]
 *     parameters:
 *       - in: path
 *         name: appointmentId
 *         required: true
 *         description: ID da consulta a ser aceita
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Consulta aceita com sucesso
 *       401:
 *         description: Token de autenticação inválido
 *       404:
 *         description: Consulta não encontrada
 *       500:
 *         description: Erro ao aceitar a consulta
 */
router.post('/accept/:appointmentId', /*authMiddleware.verifyToken,*/ doctorController.handleAppointment);

/**
 * @swagger
 * /doctor/reject/{appointmentId}:
 *   post:
 *     summary: Recusar uma consulta
 *     tags: [Doctors]
 *     parameters:
 *       - in: path
 *         name: appointmentId
 *         required: true
 *         description: ID da consulta a ser recusada
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Consulta recusada com sucesso
 *       401:
 *         description: Token de autenticação inválido
 *       404:
 *         description: Consulta não encontrada
 *       500:
 *         description: Erro ao recusar a consulta
 */
router.post('/reject/:appointmentId', /*authMiddleware.verifyToken,*/ doctorController.handleAppointment);

module.exports = router;
