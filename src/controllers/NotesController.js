const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class NotesController {
  async index(request, response) {
    const { title, tags, user_id } = request.query;
    let notes;

    if(tags) {
      const filteredTags = tags.split(",").map(tag => tag.trim());

      notes = await knex("movie_tags")
      .select([
        "movie_notes.id",
        "movie_notes.title",
        "movie_notes.description",
        "movie_notes.rating"
      ])
      .where("movie_notes.user_id", user_id)
      .whereLike("movie_notes.title", `%${title}%`)
      .whereIn("movie_tags.name", filteredTags)
      .innerJoin("movie_notes", "movie_notes.id", "movie_tags.note_id");
  
    } else {
      notes = await knex("movie_notes")
      .where({ user_id })
      .whereLike("title", `%${title}%`)
    }

    const userTags = await knex("movie_tags").where({ user_id })

    const notesWithTags = notes.map(note => {
      const tagsFromNote = userTags.filter(tag => tag.note_id == note.id);
      return {
        ...note,
        tags: tagsFromNote
      }

    });


    return response.json(notesWithTags)
    
  }

  async create(request, response) {
    const { title, description, rating, tags, user_id } = request.body;
    const fixedRating = Math.trunc(Number(rating));

    if(rating < 1 || rating > 5) {
      throw new AppError("Apenas Números de 1 a 5 são permitidos como nota.");
    }
    
    const [note_id] = await knex("movie_notes").insert({
      title,
      description,
      rating: fixedRating,
      user_id
    });

    const tagsToInsert = tags.map(name => ({
      note_id,
      user_id,
      name
    }));

    await knex("movie_tags").insert(tagsToInsert);

    return response.status(201).json({});
  }

  async show(request, response) {
    const { id } = request.params;

    const notes = await knex("movie_notes").where({ id }).first();
    const tags = await knex("movie_tags").where({ note_id: id }).orderBy("name");

    return response.json({
      ...notes,
      tags
    });
  }

  async delete(request, response) {
    const { id } = request.params;

    await knex("movie_notes").where({ id }).delete();

    return response.status(204).json();
  }
}

module.exports = NotesController;