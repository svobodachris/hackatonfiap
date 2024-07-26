const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');
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

describe('Controller da Autenticação', () => {
  afterEach(async () => {
    await User.deleteMany({});
  });

  it('deve registrar um novo médico', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'drjoao@crmedmail.com.br',
        password: 'password',
        crm: '123456',
        name: 'Dr. João da Silva',
        role: 'doctor'
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('user');
    expect(res.body.user).toHaveProperty('email', 'drjoao@crmedmail.com.br');
  });

  it('deve registrar um novo paciente', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'mariasouza@crmedmail.com.br',
        password: 'password',
        cpf: '123.456.789-00',
        name: 'Maria Souza',
        role: 'patient'
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('user');
    expect(res.body.user).toHaveProperty('email', 'mariasouza@crmedmail.com.br');
  });

  it('deve logar como usuário', async () => {
    const user = new User({
      email: 'drjoao@crmedmail.com.br',
      password: 'password',
      crm: '123456',
      name: 'Dr. João da Silva',
      role: 'doctor'
    });
    await user.save();

    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'drjoao@crmedmail.com.br',
        password: 'password'
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  it('não deve logar com credenciais incorretas', async () => {
    const user = new User({
      email: 'drjoao@crmedmail.com.br',
      password: 'password',
      crm: '123456',
      name: 'Dr. João da Silva',
      role: 'doctor'
    });
    await user.save();

    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'drjoao@crmedmail.com.br',
        password: 'wrongpassword'
      });

    expect(res.statusCode).toEqual(401);
  });

  it('não deve registrar um usuário com email existente', async () => {
    const user = new User({
      email: 'drjoao@crmedmail.com.br',
      password: 'password',
      crm: '123456',
      name: 'Dr. João da Silva',
      role: 'doctor'
    });
    await user.save();

    const res = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'drjoao@crmedmail.com.br',
        password: 'password',
        crm: '1234567',
        name: 'Dr. Pedro João da Silva',
        role: 'doctor'
      });

    expect(res.statusCode).toEqual(400);
  });
});
