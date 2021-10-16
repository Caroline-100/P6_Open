// importer express
const express = require("express");
// creer une app express
const app = express();

// body parser : parse les requete entrant dans le middleware
const body = require("body-parser");
// objet http
const userRouter = require("./routes/userRoute");
const sauceRoute = require("./routes/sauceRoute");

const authentification = require("./middleware/auth");
const path = require("path");
// connection avec Mongoose
const mongoose = require("mongoose");
// variable d' environnement
const dotenv = require("dotenv");
// // .load();
dotenv.parse;
dotenv.config();
if (dotenv.error) {
  throw dotenv.error;
}

const APP_SECRET = process.env.APP_SECRET;
const USER_ID = process.env.USER_ID;
mongoose
  .connect(
    `mongodb+srv://${USER_ID}:${APP_SECRET}@cluster002.skc60.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
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

app.use(body.json());
app.use("/image", express.static(path.join(__dirname, "image")));

// const sauceRouter = require("./routes/sauceRoute");

app.use("/api/auth", userRouter);
app.use("/api/sauces", sauceRoute);

module.exports = app;
