exports.seed = function(knex, Promise) {
  return knex('items').del()
    .then(function () {
      return Promise.all([
        knex('items').insert({name: 'Avalanche Crunch', price: 9}),
        knex('items').insert({name: 'Banana Cream', price: 9}),
        knex('items').insert({name: 'Chocolate Banana', price: 9}),
        knex('items').insert({name: 'Chocolate Crunch', price: 9}),
        knex('items').insert({name: 'Peanut Butter', price: 9}),
        knex('items').insert({name: 'Red Devil', price: 9}),
        knex('items').insert({name: 'Samoa', price: 9}),
        knex('items').insert({name: 'Smore', price: 9}),
        knex('items').insert({name: 'Snickers', price: 9}),
        knex('items').insert({name: 'Strawberry', price: 9}),
        knex('items').insert({name: 'Strawberry Ice', price: 9}),
        knex('items').insert({name: 'Twix Chocolate', price: 9}),
        knex('items').insert({name: 'Horchata', price: 12}),
        knex('items').insert({name: 'Strawchata', price: 12}),
        knex('items').insert({name: 'Coconut Horchata', price: 12})
      ])
    });
};