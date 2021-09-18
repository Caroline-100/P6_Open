// importer express
const express = require("express");
// body parser : parse les requete entrant dans le middleware
const bodyParser = require("body-parser");
// objet http
const { connection, Mongoose } = require("mongoose");

// creer une app express
const app = express();

// connection avec Mongoose
const mongoose = require("mongoose");
// variable d' environnement
const dotvent = require("dotenv");
dotvent.config();

const APP_SECRET = process.env.APP_SECRET;
const USER_ID = process.env.USER_ID;
mongoose
  .connect(
    `mongodb+srv://${USER_ID}:${APP_SECRET}@cluster0.skc60.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("The connexion is ok "))
  .catch(() => console.log("The connexion is NOT ok !"));

// systeme CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(bodyParser.json());

//helmet
//path

const userRoute = require("./routes/userRoute");

app.use("/api/auth/sign", userRoute);
app.use("/api/auth/login", userRoute);

// middleware
app.use((req, res, next) => {
  res.json("request is sending with use");
  next();
});
app.use((req, res) => {
  console.log("request send with success");
});

// exporter le fichier permet d'utiliser l'app sur les autre fichier
module.exports = app;
