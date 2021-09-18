const mongoose = require("mongoose");

const uniqueValidator = require("mongoose-unique-validator");
const UserSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true, index: true },
});

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", UserSchema);

// email: { type: String, required: true, unique: true },
// password: { type: String, required: true }
