// model Sauce
const mongoose = require("mongoose");

// create sauce schema

// sauce
const sauce = mongoose.Schema({
  userId: { type: String, required: true, index: true },
  name: { type: String, required: true, index: true },
  manufacturer: { type: String, required: true, index: true },
  description: { type: String, required: true, index: true },
  mainPepper: { type: String, required: true, index: true },
  imageUrl: { type: String, required: true, index: true },
  heat: { type: Number, required: true, index: true },
  likes: { type: Number, default: 0, index: true },
  dislikes: { type: Number, default: 0, index: true },
  usersLiked: { type: [String], index: true },
  usersDisliked: { type: [String], index: true },
});

module.exports = mongoose.model("sauce", sauce);

// // sauce
// const sauce = mongoose.Schema({
//   userId: { type: String, required: true },
// name : String — nom de la sauce
//   name: { type: String, required: true },
// ● manufacturer : String — fabricant de la sauce
//   manufacturer: { type: String, required: true },
// ● description : String — description de la sauce
//   description: { type: String, required: true },
// ● mainPepper : String — le principal ingrédient épicé de la sauce
//   mainPepper: { type: String, required: true },
// ● imageUrl : String — l'URL de l'image de la sauce téléchargée par l'utilisateur
//   imageUrl: { type: String, required: true },
// ● heat : Number — nombre entre 1 et 10 décrivant la sauce
//   heat: { type: Number, required: true },
// ● likes : Number — nombre d'utilisateurs qui aiment (= likent) la sauce
//   likes: { type: Number, default: 0 },
// ● dislikes : Number — nombre d'utilisateurs qui n'aiment pas (= dislike) la sauce
//   dislikes: { type: Number, default: 0 },
// ● usersLiked : [ "String <userId>" ] — tableau des identifiants des utilisateurs
// qui ont aimé (= liked) la sauce
//   usersLiked: { type: [String] },
// ● usersDisliked : [ "String <userId>" ] — tableau des identifiants des
// utilisateurs qui n'ont pas aimé (= disliked) la sauce
//   userDisliked: { type: [String] },
// });
