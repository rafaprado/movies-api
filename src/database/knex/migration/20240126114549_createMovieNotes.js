exports.up = function(knex) {
  return knex.schema.createTable("movie_notes", table => {
    table.increments("id");
    table.string("title", 255).notNullable();
    table.text("description");
    table.tinyint("rating").checkBetween([1, 5]);
    table.integer("user_id").unsigned();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());

    table.foreign("user_id").references("users.id").onDelete("CASCADE");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("movie_notes");
};
