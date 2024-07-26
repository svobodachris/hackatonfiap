const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');
const Patient = require('../src/models/patientModel');
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

describe('Controller dos Pacientes', () => {
  let token;

  beforeEach(async () => {
    await Patient.deleteMany({});
    await User.deleteMany({});

    const patient = new User({
      email: 'mariasouza@crmedmail.com.br',
      password: 'password',
      cpf: '12345678900',
      name: 'Maria Souza',
      role: 'patient'
    });
    await patient.save();

    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'mariasouza@crmedmail.com.br',
        password: 'password'
      });

    token = res.body.token;
  });

  afterEach(async () => {
    await Patient.deleteMany({});
    await User.deleteMany({});
  });

  it('deve permitir que um paciente faça o upload de registro médico', async () => {
    const res = await request(app)
      .post('/api/patients/records')
      .set('Authorization', `Bearer ${token}`)
      .attach('file', '__tests__/files/registro_medico.pdf')
      .field('description', 'Teste de Registro Medico');

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('record');
    expect(res.body.record).toHaveProperty('description', 'Teste de Registro Médico');
  });

  it('deve permitir um paciente obter seus registros médicos', async () => {
    const patient = await Patient.findOne({ email: 'mariasouza@crmedmail.com.br' });
    patient.medicalRecords.push({ description: 'Registro de Teste', fileUrl: 'test_url' });
    await patient.save();

    const res = await request(app)
      .get('/api/patients/records')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('records');
    expect(res.body.records).toHaveLength(1);
    expect(res.body.records[0]).toHaveProperty('description', 'Registro de Teste');
  });

  it('deve permitir um paciente compartilhar seus registros médicos', async () => {
    const patient = await Patient.findOne({ email: 'mariasouza@crmedmail.com.br' });
    patient.medicalRecords.push({ description: 'Registro de Teste', fileUrl: 'test_url' });
    await patient.save();

    const res = await request(app)
      .post('/api/patients/share')
      .set('Authorization', `Bearer ${token}`)
      .send({
        doctorId: '60d9f1b0b5e95b001c5f9b6c',
        records: [patient.medicalRecords[0]._id]
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Registros compartilhados com sucesso');
  });

  it('deve permitir um paciente excluir um registro médico', async () => {
    const patient = await Patient.findOne({ email: 'mariasouza@crmedmail.com.br' });
    patient.medicalRecords.push({ description: 'Registro de Teste', fileUrl: 'test_url' });
    await patient.save();

    const res = await request(app)
      .delete(`/api/patients/records/${patient.medicalRecords[0]._id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Registro excluído com sucesso');
  });
});
