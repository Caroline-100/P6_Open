//module permettant de manipuler des données dans la base de données
const mongoose = require("mongoose");
// module permet de renforcer l'uniciter de l'utilisateur
const uniqueValidator = require("mongoose-unique-validator");
// creation du schéma
const UserSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true, index: true },
});

UserSchema.plugin(uniqueValidator);

// const modelUser = mongoose.model("userschema", UserSchema);
// console.log("schema_file", modelUser);
// module.exports = modelUser;
module.exports = mongoose.model("userschema", UserSchema);
