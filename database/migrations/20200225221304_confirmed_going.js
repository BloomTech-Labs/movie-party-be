exports.up = function(knex, Promise) {
    return knex.schema.createTable("confirmed_going", tbl => {
      tbl.increments();
  
      tbl
      .integer('event_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('event');

      tbl
      .integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users');

      tbl
        .boolean('going');
            
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("confirmed_going");
  };
  