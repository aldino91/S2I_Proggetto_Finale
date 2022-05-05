const { users } = require("../models/index");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AuthConfig = require("../config/Auth");
require("dotenv").config({ path: "./.env" });

module.exports = {
  singIn(req, res) {
    const { email, password } = req.body;

    users
      .findOne({
        where: { email: email },
      })
      .then((user) => {
        if (!user) {
          res.status(404).json({
            msg: "Non abbiamo trovato nessun usuario con questa email!",
          });
        } else {
          if (bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign({ user: user }, AuthConfig.secret, {
              expiresIn: AuthConfig.expires,
            });

            // ritorno del token
            res.json({
              user: user,
              token: token,
            });
          } else {
            res.status(401).json({ msg: "La password non é corretta!" });
          }
        }
      });
  },

  singUp(req, res) {
    // encryptamo la password
    const password = bcrypt.hashSync(
      req.body.password,
      Number.parseInt(AuthConfig.rounds)
    );

    // registro usuario
    users
      .create({
        name: req.body.name,
        email: req.body.email,
        password: password,
      })
      .then((user) => {
        // creazione token
        const token = jwt.sign({ user: user }, AuthConfig.secret, {
          expiresIn: AuthConfig.expires,
        });

        // ritorno del token
        res.json({
          user: user,
          token: token,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getUser(req, res) {
    res.json({ user: req.user });
  },
};
