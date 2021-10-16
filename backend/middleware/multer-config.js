// Téléchargement de fichiers pour que les utilisateurs puissent télécharger des images
// multer nous pernet de stocker des images dans le disque
const multer = require("multer");

const MINE_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

// facilite la gestion de l'enregistrement des images, creation d un middleware,
// creation d'un objet qui permet de stokés les images dans le disque
const storage = multer.diskStorage({
  // ou va le fichier
  destination: (req, file, callback) => {
    callback(null, "image");
  },
  // qu'elle sera le nom du fichier
  filename: (req, file, callback) => {
    //on remplace les espaces par des underscores
    const name = file.fieldname.split(" ").join("_");
    // nous avons besoin de définir extension du fichier, nous ajoutons une date au fichiers
    const extension = MINE_TYPES[file.mimetype];
    // console.log("ext", extension);
    callback(null, name + Date.now() + "." + extension);
  },
});
module.exports = multer({ storage }).single("image");
// console.log(storage);
