const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Doctor = require('../models/doctorModel');
const Patient = require('../models/patientModel');
const config = require('../config/config');

// Função para gerar token JWT
const generateToken = (id) => {
  return jwt.sign({ id }, config.jwtSecret, { expiresIn: '1h' });
};

// Login para médicos
exports.loginDoctor = async (req, res) => {
  const { crm, password } = req.body;

  try {
    // Verificar se o médico existe
    const doctor = await Doctor.findOne({ crm });
    if (!doctor) {
      return res.status(404).json({ message: 'Médico não encontrado' });
    }

    // Verificar a senha
    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciais inválidas' });
    }

    // Gerar token
    const token = generateToken(doctor._id);

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao fazer login', error });
  }
};

// Login para pacientes
exports.loginPatient = async (req, res) => {
  const { email, cpf, password } = req.body;

  try {
    // Verificar se o paciente existe
    const patient = await Patient.findOne({ email, cpf });
    if (!patient) {
      return res.status(404).json({ message: 'Paciente não encontrado' });
    }

    // Verificar a senha
    const isMatch = await bcrypt.compare(password, patient.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciais inválidas' });
    }

    // Gerar token
    const token = generateToken(patient._id);

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao fazer login', error });
  }
};
