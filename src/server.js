const http = require('http');
const app = require('./app');
const { port } = require('./config/config');

// Configura a porta a partir do arquivo de configuração ou padrão para 3000
const PORT = port || 3000;

// Cria um servidor HTTP usando o aplicativo Express
const server = http.createServer(app);

// Inicia o servidor e escuta a porta especificada
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// Lida com erros no servidor
server.on('error', (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  
  const bind = typeof PORT === 'string' ? `Pipe ${PORT}` : `Port ${PORT}`;

  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requer privilégios de administrador`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} já está em uso`);
      process.exit(1);
      break;
    default:
      throw error;
  }
});
