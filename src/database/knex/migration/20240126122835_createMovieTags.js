exports.up = function(knex) {
  return knex.schema.createTable("movie_tags", table => {
    table.increments("id");
    table.integer("note_id").unsigned();
    table.integer("user_id").unsigned();
    table.string("name", 255).notNullable();

    table.foreign("note_id").references("movie_notes.id").onDelete("CASCADE");
    table.foreign("user_id").references("users.id").onDelete("CASCADE");
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("movie_tags");
};
