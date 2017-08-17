exports.up = function(knex, Promise) {
  return knex.schema.createTable("selections", (table) => {
    table.increments('id');
    table.integer('orders_id').references('orders.id');
    table.integer('items_id').references('items.id');
    table.integer('quantity');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("selections");
};
