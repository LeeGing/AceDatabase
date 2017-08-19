exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({name: 'User 1', phone: 6043197832, email: 'user@user.com'})
      ]);
    });
};
