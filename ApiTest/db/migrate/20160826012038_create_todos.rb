class CreateTodos < ActiveRecord::Migration[5.0]
  def change
    create_table :todos do |t|
      t.string :name
      t.boolean :completed, default: false, null: false

      t.timestamps
    end
  end
end
