const Doctor = require('../models/doctorModel');
const Appointment = require('../models/appointmentModel');
const bcrypt = require('bcryptjs');

// Cadastro de médico
exports.registerDoctor = async (req, res) => {
  const { name, email, password, crm, specialty } = req.body;

  try {
    // Verificar se o médico já existe
    const existingDoctor = await Doctor.findOne({ crm });
    if (existingDoctor) {
      return res.status(400).json({ message: 'Médico já cadastrado' });
    }

    // Criptografar senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criar novo médico
    const newDoctor = new Doctor({
      name,
      email,
      password: hashedPassword,
      crm,
      specialty,
    });

    await newDoctor.save();
    res.status(201).json({ message: 'Médico cadastrado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao cadastrar médico', error });
  }
};

// Editar horários disponíveis do médico
exports.editAvailableHours = async (req, res) => {
  const { doctorId, availableHours } = req.body;

  try {
    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({ message: 'Médico não encontrado' });
    }

    doctor.availableHours = availableHours;
    await doctor.save();

    res.status(200).json({ message: 'Horários disponíveis atualizados com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar horários disponíveis', error });
  }
};

// Aceitar ou recusar consultas
exports.handleAppointment = async (req, res) => {
  const { appointmentId, status } = req.body;

  try {
    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: 'Consulta não encontrada' });
    }

    appointment.status = status;
    await appointment.save();

    res.status(200).json({ message: `Consulta ${status} com sucesso` });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar status da consulta', error });
  }
};
