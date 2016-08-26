class TodoSerializer < ActiveModel::Serializer
  attributes :id, :name, :completed
end
