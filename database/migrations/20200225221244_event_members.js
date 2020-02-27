exports.up = function(knex, Promise) {
    return knex.schema.createTable("event_members", tbl => {
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
            
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("event_members");
  };
  