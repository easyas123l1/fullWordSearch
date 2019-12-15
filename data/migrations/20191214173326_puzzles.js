exports.up = function(knex) {
  return knex.schema
    .createTable("users", tbl => {
      tbl.increments();

      tbl.string("name", 255).notNullable();
    })
    .createTable("puzzles", tbl => {
      tbl.increments();

      tbl
        .string("name", 255)
        .notNullable()
        .unique();

      tbl.string("code", 8000).notNullable();

      tbl.string("description", 500);

      tbl.integer("rating");

      tbl
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("words", tbl => {
      tbl.increments();

      tbl
        .string("word", 255)
        .notNullable()
        .index();

      tbl
        .integer("puzzle_id")
        .unsigned()
        .references("id")
        .inTable("puzzles")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("users")
    .dropTableIfExists("puzzles")
    .dropTableIfExists("words");
};
