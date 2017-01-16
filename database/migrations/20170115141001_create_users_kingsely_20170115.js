
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', table => {
        table.increments().primary();

        table.string('username', 255).comment('用户名');
        table.string('password', 255).comment('密码');
        table.integer('type').defaultTo(1).unsigned().comment('类型');

        table.timestamps();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users');
};
