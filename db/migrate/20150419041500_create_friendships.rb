class CreateFriendships < ActiveRecord::Migration
  def change
    create_table :friendships do |t|
      t.integer :creator_id
      t.integer :admirer_id

      t.timestamps
    end
  end
end