exports.up = async function(knex) {
  return knex.schema.createTable('users', users => {
    users.increments();

    users
      .string('username', 255)
      .notNullable()
      .unique();
    users.string('password', 255).notNullable();
    users
    .string('role', 255)
    .notNullable();
  });
};

exports.down = async function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
