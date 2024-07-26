const Patient = require('../models/patientModel');
const Doctor = require('../models/doctorModel');
const bcrypt = require('bcryptjs');

// Registro de paciente
exports.registerPatient = async (req, res) => {
  const { name, email, password, cpf } = req.body;

  try {
    // Verificar se o paciente já existe
    const existingPatient = await Patient.findOne({ email, cpf });
    if (existingPatient) {
      return res.status(400).json({ message: 'Paciente já cadastrado' });
    }

    // Criptografar senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criar novo paciente
    const newPatient = new Patient({
      name,
      email,
      password: hashedPassword,
      cpf,
    });

    await newPatient.save();
    res.status(201).json({ message: 'Paciente cadastrado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao cadastrar paciente', error });
  }
};

// Busca por médicos disponíveis
exports.searchDoctors = async (req, res) => {
  const { specialty, distance, rating } = req.query;

  try {
    // Construir query de busca
    const query = {};
    if (specialty) {
      query.specialty = specialty;
    }
    if (distance) {
      // Lógica de busca por distância pode ser implementada aqui
    }
    if (rating) {
      query.rating = { $gte: rating };
    }

    const doctors = await Doctor.find(query);
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar médicos', error });
  }
};

// Acesso ao prontuário eletrônico
exports.getMedicalRecords = async (req, res) => {
  const { patientId } = req.params;

  try {
    const patient = await Patient.findById(patientId).populate('medicalRecords');
    if (!patient) {
      return res.status(404).json({ message: 'Paciente não encontrado' });
    }

    res.status(200).json(patient.medicalRecords);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao acessar prontuário eletrônico', error });
  }
};

// Upload de arquivos no prontuário eletrônico
exports.uploadMedicalRecords = async (req, res) => {
  const { patientId } = req.params;
  const { files } = req.body;

  try {
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: 'Paciente não encontrado' });
    }

    patient.medicalRecords.push(...files);
    await patient.save();

    res.status(200).json({ message: 'Arquivos carregados com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao carregar arquivos', error });
  }
};

// Compartilhamento de prontuário eletrônico
exports.shareMedicalRecords = async (req, res) => {
  const { patientId } = req.params;
  const { doctorId, files, duration } = req.body;

  try {
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: 'Paciente não encontrado' });
    }

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: 'Médico não encontrado' });
    }

    const sharedRecord = {
      doctor: doctorId,
      files,
      expiration: new Date(Date.now() + duration * 60 * 60 * 1000), // Duração em horas
    };

    patient.sharedRecords.push(sharedRecord);
    await patient.save();

    res.status(200).json({ message: 'Prontuário compartilhado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao compartilhar prontuário', error });
  }
};
