const multer = require("multer");
const Sauce = require("../models/Sauce");
const authentification = require("../middleware/auth");
const DowloadImage = require("../middleware/multer-config");
const { route } = require("../routes/userRoute");

const fs = require("fs");

exports.AllSauce = (req, res, next) => {
  Sauce.find(function sauce(err, sauce) {
    if (err) {
      res.send(err);
    }
    // console.log("sauce", sauce);
    res.json(sauce);
  });
};

exports.oneSauce = function oneSauce(req, res, next) {
  Sauce.findOne({
    _id: req.params.id,
  })
    .then((sauce) => {
      res.status(200).json(sauce);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

exports.createSauce = function createSauce(req, res, next) {
  const imageObject = JSON.parse(req.body.sauce);
  //   console.log(imageObject);
  const sauce = new Sauce({
    ...imageObject,
    imageUrl: `${req.protocol}://${req.get("host")}/image/${req.file.filename}`,
  });
  sauce
    .save()
    .then(() => {
      res.status(201).json({
        message: " Sauce saved succefully",
      });
    })
    .catch((error) => {
      res.status(400).json({
        message: "Not post Sauce",
      });
    });
};

exports.updateSauce = function updateSauce(req, res, next) {
  const objectExist = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/image/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  //Quel objet on modifie : id correspondant au parametre de la requete
  //nouvelle version de l'objet
  // on precise quel objet
  // promise
  Sauce.updateOne(
    { _id: req.params.id },
    { ...objectExist, _id: req.params.id }
  )
    .then(() => {
      res.status(200).json({
        message: " Object modified",
      });
    })
    .catch((error) => res.status(400).json({ error }));
  //   );
};

exports.deleteSauce = function deleteSauce(req, res, next) {
  // chercher url : acces au nom du fichier
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      const fileName = sauce.imageUrl.split("/image/")[1];
      //   console.log(fileName);
      // supprimer le fichier
      fs.unlink(`image/${fileName}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => {
            res.status(200).json({ message: "Delete Sauce" });
          })
          .catch((error) => {
            res.status(400).json({ error });
          });
      });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.likeSauce = function like(req, res, next) {
  //like a sauce
  if (req.body.like === 1) {
    Sauce.updateOne(
      { _id: req.params.id },
      { $push: { usersLiked: req.body.userId }, $inc: { likes: +1 } }
    )
      .then(() => {
        console.log({ message: "like add" });
        res.status(200).json({ message: "like add" });
      })
      .catch((error) => {
        res.status(400).json({ error });
      });
  }
  // annule le dislike
  if (req.body.like === 0) {
    Sauce.findOne({ _id: req.params.id }).then((sauce) => {
      if (sauce.usersDisliked.find((userId) => userId === req.body.userId)) {
        Sauce.updateOne(
          { _id: req.params.id },
          { $pull: { usersDisliked: req.body.userId }, $inc: { dislikes: -1 } }
        )
          .then(() => {
            res.status(200).json({ message: "dislike-1" });
          })
          .catch((error) => {
            res.status(400).json({ error });
          });
      }
      //annule le like
      if (sauce.usersLiked.find((userId) => userId === req.body.userId)) {
        Sauce.updateOne(
          { _id: req.params.id },
          { $pull: { usersLiked: req.body.userId }, $inc: { likes: -1 } }
        )
          .then(() => {
            res.status(200).json({ message: "n aime plus" });
          })
          .catch((error) => {
            res.status(400).json({ error });
          });
      }
    });
  }
  // ajoute de un le dislike
  if (req.body.like === -1) {
    Sauce.updateOne(
      { _id: req.params.id },
      { $push: { usersDisliked: req.body.userId }, $inc: { dislikes: +1 } }
    )
      .then(() => {
        console.log({ message: "dislike" });
        return res.status(200).json({ message: "dislike" });
      })
      .catch((error) => {
        res.status(400).json({ error });
      });
  }
};
