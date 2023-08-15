const AppError = require("../util/AppError");
const knex = require("../database/knex/index");
const { json } = require("express");

class MovieNotesController {
  async create(require, response) {
    const { user_id } = require.params;
    const { title, description, rating, tags } = require.body;

    const [note_id] = await knex("movie_notes").insert({
      title,
      description,
      rating,
      user_id,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    });

    const tagsInsert = tags.map((name) => {
      return {
        note_id,
        name,
        user_id,
      };
    });

    await knex("movie_tags").insert(tagsInsert);

    return response
      .status(201)
      .json({ message: "Nota cadastrada com sucesso!" });
  }

  async delete(require, response) {
    const { note_id } = require.params;

    const note = await knex("movie_notes").where("id", note_id).first();

    if(!note){
      throw new AppError("Nota não existe", 404)
    }

    await knex("movie_notes").where("id", note_id).del();
    
    return response.status(200).json({message: "Nota excluída com sucesso!"})
  }
}

module.exports = MovieNotesController;
