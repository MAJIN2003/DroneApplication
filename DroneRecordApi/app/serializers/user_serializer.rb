class UserSerializer < Panko::Serializer
  attributes :id,
             :username,
             :email,
             :nombre,
             :apellido,
             :role
end
