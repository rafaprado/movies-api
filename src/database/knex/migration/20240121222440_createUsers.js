exports.up = function(knex) {
  return knex.schema.createTable("users", table => {
    table.increments("id");
    table.string("name", 255).notNullable();
    table.string("email", 255).notNullable();
    table.text("password").notNullable();
    table.text("avatar");

    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("users");
};
