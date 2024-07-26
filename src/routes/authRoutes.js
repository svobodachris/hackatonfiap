const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Rotas para autenticação de médicos e pacientes
 */

/**
 * @swagger
 * /auth/login/doctor:
 *   post:
 *     summary: Login de médicos
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               crm:
 *                 type: string
 *                 description: Número do CRM do médico
 *               password:
 *                 type: string
 *                 description: Senha do médico
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token JWT do médico
 *       401:
 *         description: Credenciais inválidas
 *       500:
 *         description: Erro ao realizar login
 */
router.post('/login/doctor', authController.loginDoctor);

/**
 * @swagger
 * /auth/login/patient:
 *   post:
 *     summary: Login de pacientes
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email do paciente
 *               cpf:
 *                 type: string
 *                 description: CPF do paciente
 *               password:
 *                 type: string
 *                 description: Senha do paciente
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token JWT do paciente
 *       401:
 *         description: Credenciais inválidas
 *       500:
 *         description: Erro ao realizar login
 */
router.post('/login/patient', authController.loginPatient);

module.exports = router;
