const Appointment = require('../models/appointmentModel');
const Doctor = require('../models/doctorModel');
const Patient = require('../models/patientModel');

// Agendar uma consulta
exports.scheduleAppointment = async (req, res) => {
  try {
    const { doctorId, patientId, date, time } = req.body;

    // Verificar se o médico está disponível
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: 'Médico não encontrado' });
    }

    // Verificar se o paciente existe
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: 'Paciente não encontrado' });
    }

    // Criar novo agendamento
    const newAppointment = new Appointment({
      doctor: doctorId,
      patient: patientId,
      date,
      time,
    });

    await newAppointment.save();
    res.status(201).json({ message: 'Consulta agendada com sucesso', newAppointment });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao agendar consulta', error });
  }
};

// Listar consultas de um médico
exports.getDoctorAppointments = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const appointments = await Appointment.find({ doctor: doctorId }).populate('patient', 'name email');
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar consultas', error });
  }
};

// Listar consultas de um paciente
exports.getPatientAppointments = async (req, res) => {
  try {
    const { patientId } = req.params;
    const appointments = await Appointment.find({ patient: patientId }).populate('doctor', 'name email');
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar consultas', error });
  }
};

// Cancelar uma consulta
exports.cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: 'Consulta não encontrada' });
    }

    await appointment.remove();
    res.status(200).json({ message: 'Consulta cancelada com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao cancelar consulta', error });
  }
};
