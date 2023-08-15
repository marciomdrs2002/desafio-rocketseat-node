const nodemailer = require('nodemailer');
require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env


// Configuração do serviço de envio de emails (SMTP)
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Por exemplo, use o Gmail
  auth: {
    user: process.env.EMAIL_USER, // Seu endereço de email
    pass: process.env.EMAIL_PASS
  }
});

module.exports = transporter;
