const jwt = require("jsonwebtoken");

const authentification = function auth(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const detoken = jwt.verify(token, "RANDOM_SECRET_TOKEN");
    const userId = detoken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw "Invalid user ID";
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({
      error: new Error("Invalid request !! "),
    });
  }
};

module.exports = authentification;
