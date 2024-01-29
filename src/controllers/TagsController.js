const knex  = require("../database/knex");

class TagsController {
  async delete(request, response) {
    const { id } = request.params;

    await knex("movie_tags").where({ id }).delete();

    return response.status(204).json({})
  }
}

module.exports = TagsController;