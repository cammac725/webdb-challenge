
exports.up = function (knex, Promise) {
  return knex.schema
    .createTable('actions', tbl => {
      tbl.increments();
      tbl
        .string('name', 128)
        .notNullable()
        .unique()
      tbl
        .text('description', 255)
        .notNullable()
      tbl
        .text('notes')
      tbl
        .integer('project_id')
        .unsigned()
        .references('id')
        .inTable('projects')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      tbl
        .boolean('completed')
        .notNullable()

    })
};

exports.down = function (knex, Promise) {
  return knex.schema
    .dropTableIfExists('actions')
};
