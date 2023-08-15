const AppError = require("../util/AppError");
const knex = require("../database/knex/index");
const bcrypt = require("bcrypt");
const crypto = require("crypto"); // Para gerar tokens seguros
const transporter = require("../../nodemailer");
const { response } = require("express");
require("dotenv").config();

class UserController {
  async create(req, res) {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const duplicatedEmail = await knex("users").where("email", email).first();

    if (duplicatedEmail) {
      throw new AppError("Esse e-mail já está em uso");
    }

    await knex("users").insert({
      name,
      email,
      password: hashedPassword,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    });

    res.status(201).json({ message: "Usuário criado com sucesso" });
  }

  async forgotPassword(req, res) {
    const { email } = req.body;

    const emailExists = await knex("users").where("email", email).first();

    if (!emailExists) {
      throw new AppError("Esse e-mail não está cadastrado");
    }

    try {
      // Gerar uma nova senha aleatória
      const newPassword = crypto.randomBytes(8).toString("hex");
      // Hash da nova senha
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Atualizar a senha no banco de dados
      await knex("users")
        .where("email", email)
        .update({ 
          password: hashedPassword,
        });

      // Enviar a nova senha por email
      await transporter.sendMail({
        from: process.env.EMAIL_USER, // Seu endereço de email
        to: email,
        subject: "Nova Senha",
        text: `Sua nova senha é: ${newPassword}`,
      });

      res
        .status(200)
        .json({ message: "Senha atualizada e nova senha enviada por email." });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "Erro ao atualizar a senha e enviar a nova senha por email.",
      });
    }
  }
}

module.exports = UserController;
