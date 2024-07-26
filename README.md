# CRMED - Sistema de Telemedicina e Prontuário Eletrônico

Este projeto é um sistema de Telemedicina e Prontuário Eletrônico desenvolvido para a startup CRMED. O objetivo é proporcionar um serviço de maior qualidade, segurança dos dados dos pacientes e redução de custos, permitindo o gerenciamento eficiente de agendamentos e consultas online.

## Funcionalidades

- **Autenticação de Usuário (Médico e Paciente)**
- **Cadastro e Edição de Horários Disponíveis (Médico)**
- **Aceite ou Recusa de Consultas Médicas (Médico)**
- **Busca por Médicos (Paciente)**
- **Agendamento de Consultas (Paciente)**
- **Teleconsulta**
- **Prontuário Eletrônico**:
  - Acesso e Upload de Arquivos Médicos
  - Gestão de Compartilhamento de Documentos

## Requisitos Não Funcionais

- **Alta Disponibilidade**: O sistema deve estar disponível 24/7.
- **Escalabilidade**: Suporte para até 20.000 usuários simultâneos.
- **Segurança**: Alta camada de segurança para proteção dos dados sensíveis dos pacientes.

## Configuração do Ambiente

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto e configure as seguintes variáveis:

Configurações do MongoDB
MONGO_URI=mongodb://localhost:27017/crmed

Porta do servidor
PORT=5000

Chave JWT para autenticação
JWT_SECRET=chaveautenticacao

Ambiente de execução
NODE_ENV=development

### Instalação de Dependências

Para instalar as dependências do projeto, execute:
npm install

Caso posteriormente ocorra erro, utilize:

`npm install cors`

`npm install express`

`npm install morgan`

`npm install mongoose`

`npm install helmet`

`npm install swagger-jsdoc swagger-ui-express`

### Iniciar o Servidor

Para iniciar o servidor em modo de desenvolvimento, execute:
`npm run dev`

Para iniciar o servidor em modo de produção, execute:
`npm start`

### Executar Testes

Para executar os testes, execute:
`npm test`

### Testar a documentação:

`http://localhost:3000/api-docs`
