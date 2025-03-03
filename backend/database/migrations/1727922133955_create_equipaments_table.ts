import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'Equipament'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id', { primaryKey: true }).notNullable()
      table.string('model').notNullable()
      table.string('manufacturer').notNullable()
      table.integer('category_id').notNullable().unsigned().references('id').inTable('Categories')
      table.string('description').nullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
      table.timestamp('deleted_at').nullable()
      table.unique(['model'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
