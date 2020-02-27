exports.up = function(knex, Promise) {
    return knex.schema.createTable("confirmed_paid", tbl => {
      tbl.increments();
  
      tbl
      .integer('event_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('event');

      tbl
      .integer('member_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('event_members');

      tbl
        .boolean('paid');
            
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("confirmed_paid");
  };
  