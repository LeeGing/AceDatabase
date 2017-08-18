exports.up = function(knex, Promise) {
  return knex.schema.createTable("items", (table) => {
    table.integer('id');
    table.string('name');
    table.integer('price');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("items");
};
