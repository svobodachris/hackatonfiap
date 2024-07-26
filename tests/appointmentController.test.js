const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');
const Appointment = require('../src/models/appointmentModel');

// Configurações de teste do MongoDB (usar um banco de dados separado para testes)
const dbUri = 'mongodb://localhost:27017/crmed_test';

beforeAll(async () => {
  await mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

describe('Controller dos Agendamentos', () => {
  let token;
  let doctorId;
  let patientId;
  
  beforeAll(async () => {
    // Criar um médico para os testes
    const doctorRes = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'drjoao@crmedmail.com.br',
        password: 'password',
        crm: '123456',
        name: 'Dr. João da Silva',
        role: 'doctor'
      });

    doctorId = doctorRes.body.user._id;

    // Criar um paciente para os testes
    const patientRes = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'mariasouza@crmedmail.com.br',
        password: 'password',
        cpf: '123.456.789-00',
        name: 'Maria Souza',
        role: 'patient'
      });

    patientId = patientRes.body.user._id;

    // Autenticar como paciente
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'mariasouza@crmedmail.com.br',
        password: 'password'
      });

    token = loginRes.body.token;
  });

  it('deve criar um novo agendamento', async () => {
    const res = await request(app)
      .post('/api/appointments')
      .set('Authorization', `Bearer ${token}`)
      .send({
        doctor: doctorId,
        patient: patientId,
        date: '2024-08-01T10:00:00Z'
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
  });

  it('deve obter todos agendamento', async () => {
    const res = await request(app)
      .get('/api/appointments')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('deve obter um agendamento específico pelo ID', async () => {
    const appointment = new Appointment({
      doctor: doctorId,
      patient: patientId,
      date: '2024-08-01T11:00:00Z'
    });
    await appointment.save();

    const res = await request(app)
      .get(`/api/appointments/${appointment._id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id', appointment._id.toString());
  });

  it('deve atualizar um apontamento pelo ID', async () => {
    const appointment = new Appointment({
      doctor: doctorId,
      patient: patientId,
      date: '2024-08-01T12:00:00Z'
    });
    await appointment.save();

    const res = await request(app)
      .put(`/api/appointments/${appointment._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ date: '2024-08-02T12:00:00Z' });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id', appointment._id.toString());
    expect(res.body).toHaveProperty('date', '2024-08-02T12:00:00.000Z');
  });

  it('deve excluir um apontamento pelo ID', async () => {
    const appointment = new Appointment({
      doctor: doctorId,
      patient: patientId,
      date: '2024-08-01T13:00:00Z'
    });
    await appointment.save();

    const res = await request(app)
      .delete(`/api/appointments/${appointment._id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(204);
  });
});
