const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const User = require("../models/User");
//test
// fonction qui permet de s enregistrer dans la base de donnes
exports.signup = (req, res, next) => {
  // hacher le mdp
  console.log(req.body.email, req.body.password);
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      //cree utilisateur avec model mongoose
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      // save dans la base de donnée
      user
        .save()
        .then(() =>
          res.status(201).json({ message: "utilisateur enregistres" })
        )
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

// fonction qui permet de s'identifier dans la base de données
exports.login = (req, res, next) => {
  //trouver l'email existant dans la base de donnée
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
