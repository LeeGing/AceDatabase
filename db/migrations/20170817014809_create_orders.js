exports.up = function(knex, Promise) {
  return knex.schema.createTable("orders", (table) => {
    table.increments('id');
    table.integer('user_id').references('users.id');
    table.timestamp('time').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("orders");
};
