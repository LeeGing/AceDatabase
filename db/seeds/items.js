exports.seed = function(knex, Promise) {
  return knex('items').del()
    .then(function () {
      return Promise.all([
        knex('items').insert({name: 'Donut 1', price: 10}),
        knex('items').insert({name: 'Donut 2', price: 10}),
        knex('items').insert({name: 'Donut 3', price: 10}),
        knex('items').insert({name: 'Donut 4', price: 10}),
        knex('items').insert({name: 'Donut 5', price: 10}),
        knex('items').insert({name: 'Donut 6', price: 10}),
        knex('items').insert({name: 'Donut 7', price: 10}),
        knex('items').insert({name: 'Donut 8', price: 10}),
        knex('items').insert({name: 'Donut 9', price: 10}),
        knex('items').insert({name: 'Donut 10', price: 10}),
        knex('items').insert({name: 'Donut 11', price: 10}),
        knex('items').insert({name: 'Donut 12', price: 10}),
        knex('items').insert({name: 'Drink 1', price: 8}),
        knex('items').insert({name: 'Drink 2', price: 8}),
        knex('items').insert({name: 'Drink 3', price: 8}),
        knex('items').insert({name: 'Drink 4', price: 8}),
        knex('items').insert({name: 'Drink 5', price: 8}),
        knex('items').insert({name: 'Drink 6', price: 8})
      ])
    });
};