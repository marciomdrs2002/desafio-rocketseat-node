const { Router } = require ("express");
const usersRoutes = Router();

const UserController = require("../controllers/UserController")
const userController = new UserController();

usersRoutes.post("/", userController.create);
usersRoutes.post("/forgotPassword", userController.forgotPassword);

module.exports = usersRoutes;