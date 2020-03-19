exports.up = function(knex, Promise) {
    return knex.schema.createTable("users", tbl => {
      tbl.increments();
  
      tbl
        .string('first_name', 255)
        .notNullable();
  
      tbl
        .string('last_name', 255)
        .notNullable();
      
      tbl
        .string('email', 255)
        .notNullable()
        .unique();

      tbl
        .string('password', 128)
        .notNullable();
  
      tbl
        .integer('invite_code')
        .nullable()
        .unsigned()
        .unique();
        
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
    return knex.schema.dropTableIfExists("users");
  };
  