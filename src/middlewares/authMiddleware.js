const jwt = require('jsonwebtoken');
const config = require('../config/config');

// Middleware de autenticação
const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Token de autenticação não fornecido' });
  }

  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token inválido ou expirado' });
    }

    // Adicionar informações decodificadas ao objeto de solicitação
    req.user = decoded;
    next();
  });
};

module.exports = authMiddleware;
