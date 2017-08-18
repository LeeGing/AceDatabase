exports.seed = function(knex, Promise) {
  return knex('items').del()
    .then(function () {
      return Promise.all([
        knex('items').insert({id: 1, name: 'Avalanche Crunch', price: 9}),
        knex('items').insert({id: 2, name: 'Banana Cream', price: 9}),
        knex('items').insert({id: 3, name: 'Chocolate Banana', price: 9}),
        knex('items').insert({id: 4, name: 'Chocolate Crunch', price: 9}),
        knex('items').insert({id: 5, name: 'Peanut Butter', price: 9}),
        knex('items').insert({id: 6, name: 'Red Devil', price: 9}),
        knex('items').insert({id: 7, name: 'Samoa', price: 9}),
        knex('items').insert({id: 8, name: 'Smore', price: 9}),
        knex('items').insert({id: 9, name: 'Snickers', price: 9}),
        knex('items').insert({id: 10, name: 'Strawberry', price: 9}),
        knex('items').insert({id: 11, name: 'Strawberry Ice', price: 9}),
        knex('items').insert({id: 12, name: 'Twix Chocolate', price: 9}),
        knex('items').insert({id: 13, name: 'Drink 1', price: 8}),
        knex('items').insert({id: 14, name: 'Drink 2', price: 8}),
        knex('items').insert({id: 15, name: 'Drink 3', price: 8})
      ])
    });
};