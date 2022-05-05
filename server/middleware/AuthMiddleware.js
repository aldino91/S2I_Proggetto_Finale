const jwt = require("jsonwebtoken");
const config = require("../config/Auth");
const { users } = require("../models/index");

const authentication = (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(401).json({ message: "non sei autenticato!!" });
  } else {
    const token = req.headers.authorization.split(" ")[1];

    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: "non sei autenticato!!" });
      } else {
        users
          .findOne({
            where: { email: decoded.user.email },
          })
          .then((resp) => {
            req.user = resp;
            next();
          })
          .catch((e) => {
            console.log(e);

            res.status(401).json({ messagge: "non sei autenticato!" });
          });
      }
    });
  }
};
module.exports = authentication;
