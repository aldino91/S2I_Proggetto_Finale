const { users } = require("../models/index");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AuthConfig = require("../config/Auth");
require("dotenv").config({ path: "./.env" });

module.exports = {
  async singIn(req, res) {
    const { email, password } = req.body;

    try {
      const user = await users.findOne({
        where: { email: email },
      });

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
    } catch (error) {
      console.log(error);
      res.status(404).json({
        msg: "Non abbiamo trovato nessun usuario con questa email!",
      });
    }
  },

  async singUp(req, res) {
    const { email } = req.body;

    try {
      const user = await users.findOne({
        where: { email: email },
      });

      if (!user) {
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
          });
      } else {
        return res.status(404).json({
          msg: "Usuario giá registrato!",
        });
      }
    } catch (error) {
      return res.status(404).json({
        msg: "Usuario giá registrato!",
      });
    }
  },

  getUser(req, res) {
    res.json({ user: req.user });
  },
};
