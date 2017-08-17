exports.up = function(knex, Promise) {
  return knex.schema.createTable("orders", (table) => {
    table.increments('id');
    table.integer('user_id').references('users.id');
    table.date('date');
    table.time('time');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("orders");
};
