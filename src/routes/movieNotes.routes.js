const { Router } = require ("express");
const usersRoutes = Router();

const MovieNotesController = require("../controllers/MovieNotesController");
const movieNotesController = new MovieNotesController();

usersRoutes.post("/:user_id", movieNotesController.create);
usersRoutes.delete("/:note_id", movieNotesController.delete);

module.exports = usersRoutes;