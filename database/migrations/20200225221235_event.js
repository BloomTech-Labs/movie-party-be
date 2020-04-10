exports.up = function (knex, Promise) {
  return knex.schema.createTable("event", (tbl) => {
    tbl.increments();

    tbl
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users");

    tbl.string("title", 255).notNullable();

    tbl.text("description").notNullable();

    tbl.time("time").notNullable();

    tbl.date("date").notNullable();

    tbl.string("organizer", 255).notNullable();

    tbl.timestamp("created_at").notNullable().defaultTo(knex.fn.now());

    tbl.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists("event");
};
