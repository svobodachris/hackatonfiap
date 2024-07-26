const { body, validationResult } = require('express-validator');

const validateLoginInputs = () => {
  return [
    body('crm').optional().isString().withMessage('CRM deve ser uma string'),
    body('email').optional().isEmail().withMessage('Email deve ser válido'),
    body('cpf').optional().isString().withMessage('CPF deve ser uma string'),
    body('password').isLength({ min: 6 }).withMessage('Senha deve ter no mínimo 6 caracteres'),
  ];
};

const validateScheduleInputs = () => {
  return [
    body('date').isISO8601().withMessage('Data deve ser válida'),
    body('time').matches(/^\d{2}:\d{2}$/).withMessage('Hora deve estar no formato HH:MM'),
  ];
};

const validateAppointmentInputs = () => {
  return [
    body('doctorId').isMongoId().withMessage('ID do médico deve ser válido'),
    body('patientId').isMongoId().withMessage('ID do paciente deve ser válido'),
    body('date').isISO8601().withMessage('Data deve ser válida'),
    body('time').matches(/^\d{2}:\d{2}$/).withMessage('Hora deve estar no formato HH:MM'),
  ];
};

const validateUploadInputs = () => {
  return [
    body('file').notEmpty().withMessage('Arquivo não pode ser vazio'),
  ];
};

const validateResults = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  validateLoginInputs,
  validateScheduleInputs,
  validateAppointmentInputs,
  validateUploadInputs,
  validateResults,
};
