# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_06_16_015040) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "datos_uavs", force: :cascade do |t|
    t.datetime "fecha_registro", null: false
    t.float "voltaje", null: false
    t.float "porcentaje_bateria", null: false
    t.float "corriente", null: false
    t.string "modo_vuelo", null: false
    t.float "velocidad", null: false
    t.float "altitud", null: false
    t.float "latitud", null: false
    t.float "longitud", null: false
    t.bigint "uav_id", null: false
    t.index ["uav_id"], name: "index_datos_uavs_on_uav_id"
  end

  create_table "estaciones_carga_ac", force: :cascade do |t|
    t.datetime "fecha_registro", null: false
    t.float "corrienteAC", null: false
    t.float "potenciaAC", null: false
    t.bigint "uav_id", null: false
    t.index ["uav_id"], name: "index_estaciones_carga_ac_on_uav_id"
  end

  create_table "estaciones_carga_dc", force: :cascade do |t|
    t.datetime "fecha_registro", null: false
    t.float "corrienteDC", null: false
    t.float "potenciaDC", null: false
    t.bigint "uav_id", null: false
    t.index ["uav_id"], name: "index_estaciones_carga_dc_on_uav_id"
  end

  create_table "paneles_solares", force: :cascade do |t|
    t.datetime "fecha_registro", null: false
    t.float "Vp", null: false
    t.float "Cp", null: false
    t.float "Vb", null: false
    t.float "Cb", null: false
    t.float "Vc", null: false
    t.float "Cc", null: false
    t.bigint "uav_id", null: false
    t.index ["uav_id"], name: "index_paneles_solares_on_uav_id"
  end

  create_table "uavs", force: :cascade do |t|
    t.string "nombre"
    t.string "descripcion"
    t.string "numero_serie"
    t.integer "tipo_dron"
    t.float "capacidad_bateria"
    t.integer "tipo_placa"
    t.float "max_viento_vuelo"
    t.bigint "user_id", null: false
    t.index ["user_id"], name: "index_uavs_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username", null: false
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.integer "role", default: 0, null: false
    t.string "nombre"
    t.string "apellido"
    t.string "jti", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["jti"], name: "index_users_on_jti", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

  add_foreign_key "datos_uavs", "uavs"
  add_foreign_key "estaciones_carga_ac", "uavs"
  add_foreign_key "estaciones_carga_dc", "uavs"
  add_foreign_key "paneles_solares", "uavs"
  add_foreign_key "uavs", "users"
end
