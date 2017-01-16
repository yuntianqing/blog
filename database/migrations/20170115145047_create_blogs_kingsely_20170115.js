
exports.up = function(knex, Promise) {
    return knex.schema.createTable('blogs', table => {
        table.increments().primary();

        table.integer('user_id').unsigned().comment('作者ID');
        table.string('title', 255).comment('标题');
        table.text('content').comment('内容');
        table.timestamps();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users');
};
