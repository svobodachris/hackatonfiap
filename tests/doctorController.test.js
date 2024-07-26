const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');
const Doctor = require('../src/models/doctorModel');
const User = require('../src/models/userModel');

// Configurações de teste do MongoDB (usar um banco de dados separado para testes)
const dbUri = 'mongodb://localhost:27017/crmed_test';

beforeAll(async () => {
  await mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

describe('Controller de Médicos', () => {
  let token;

  beforeEach(async () => {
    await Doctor.deleteMany({});
    await User.deleteMany({});

    const doctor = new User({
      email: 'drjoao@crmedmail.com.br',
      password: 'password',
      crm: '123456',
      name: 'Dr. João da Silva',
      role: 'doctor'
    });
    await doctor.save();

    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'drjoao@crmedmail.com.br',
        password: 'password'
      });

    token = res.body.token;
  });

  afterEach(async () => {
    await Doctor.deleteMany({});
    await User.deleteMany({});
  });

  it('deve permitir um médico adicionar horário livres para agendamento', async () => {
    const res = await request(app)
      .post('/api/doctors/slots')
      .set('Authorization', `Bearer ${token}`)
      .send({
        slots: [
          { date: '2024-07-25', start: '09:00', end: '10:00' },
          { date: '2024-07-26', start: '11:00', end: '12:00' }
        ]
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('slots');
    expect(res.body.slots).toHaveLength(2);
  });

  it('deve permitir um médico atualizar seus horários disponíveis', async () => {
    const doctor = await Doctor.findOne({ email: 'drjoao@crmedmail.com.br' });
    doctor.slots.push({ date: '2024-07-25', start: '09:00', end: '10:00' });
    await doctor.save();

    const res = await request(app)
      .put('/api/doctors/slots')
      .set('Authorization', `Bearer ${token}`)
      .send({
        slots: [
          { date: '2024-07-25', start: '10:00', end: '11:00' },
          { date: '2024-07-26', start: '11:00', end: '12:00' }
        ]
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('slots');
    expect(res.body.slots).toHaveLength(2);
    expect(res.body.slots[0]).toHaveProperty('start', '10:00');
  });

  it('deve permitir um médico excluir horários disponíveis', async () => {
    const doctor = await Doctor.findOne({ email: 'drjoao@crmedmail.com.br' });
    doctor.slots.push({ date: '2024-07-25', start: '09:00', end: '10:00' });
    await doctor.save();

    const res = await request(app)
      .delete('/api/doctors/slots')
      .set('Authorization', `Bearer ${token}`)
      .send({
        slots: [
          { date: '2024-07-25', start: '09:00', end: '10:00' }
        ]
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('slots');
    expect(res.body.slots).toHaveLength(0);
  });

  it('deve obter horários disponíveis para um médico', async () => {
    const doctor = await Doctor.findOne({ email: 'drjoao@crmedmail.com.br' });
    doctor.slots.push({ date: '2024-07-25', start: '09:00', end: '10:00' });
    await doctor.save();

    const res = await request(app)
      .get('/api/doctors/slots')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('slots');
    expect(res.body.slots).toHaveLength(1);
    expect(res.body.slots[0]).toHaveProperty('date', '2024-07-25');
  });
});
