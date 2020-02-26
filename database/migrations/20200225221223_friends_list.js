exports.up = function(knex, Promise) {
    return knex.schema.createTable("friends_list", tbl => {
      tbl.increments();
  
      tbl
      .integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users');

      tbl
      .integer('friend_id')
      .unsigned()
      .notNullable();
            
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("friends_list");
  };
  