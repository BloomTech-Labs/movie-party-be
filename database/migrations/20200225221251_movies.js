exports.up = function(knex, Promise) {
    return knex.schema.createTable("movies", tbl => {
      tbl.increments();
  
      tbl
      .integer('event_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('event');
  
      tbl
       .string('title', 255)
       .notNullable();
      
      tbl
       .text('poster')
       .notNullable();
  
      tbl
       .string('synopsis')
       .notNullable();
        
      tbl
      .string('times',255)
      .notNullable();
  
      tbl
      .string('ratings', 255)
      .notNullable();

      tbl
       .text('description')
       .notNullable();

      tbl
      .timestamp('created_at')
      .notNullable()
      .defaultTo(knex.fn.now());

      tbl
      .timestamp('updated_at')
      .notNullable()
      .defaultTo(knex.fn.now());
  
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("movies");
  };
  