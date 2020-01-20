exports.up = function(knex) {
  return knex.schema
    .createTable("roles", tbl => {
      tbl.increments();

      tbl
        .string("role")
        .notNullable()
        .unique();
    })
    .createTable("users", tbl => {
      tbl.increments();

      tbl
        .string("username", 255)
        .notNullable()
        .unique();

      tbl.string("password", 8000).notNullable();

      tbl.string("created").notNullable();

      tbl.string("fullname", 255);

      tbl.string("phone", 255);

      tbl.string("address", 255);

      tbl.string("state", 255);

      tbl.integer("zip");

      tbl
        .integer("role_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("roles")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
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
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    })
    .createTable("words", tbl => {
      tbl.increments();

      tbl
        .string("word", 255)
        .notNullable()
        .index();

      tbl.string("position").notNullable();

      tbl.string("direction").notNullable();

      tbl
        .integer("puzzle_id")
        .unsigned()
        .references("id")
        .inTable("puzzles")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("roles")
    .dropTableIfExists("users")
    .dropTableIfExists("puzzles")
    .dropTableIfExists("words");
};
