const { Restaurant } = require("../models/index");

module.exports = {
  AddRestaurant(req, res) {
    const name = req.body.name;
    const city = req.body.city;
    const telephone = req.body.telephone;
    const address = req.body.address;
    const idUser = req.body.idUser;

    Restaurant.create({
      name,
      city,
      telephone,
      address,
      idUser,
    })
      .then((resp) => {
        res.json({ msg: "dati salvati correttamente!" });
      })
      .catch((err) => {
        console.log(err);
        console.log("non siamo riusciti a salvare il ristorante!");
      });
  },

  getAllRestaurant(req, res) {
    const idUser = req.params.idUser;

    Restaurant.findAll({
      where: { idUser: idUser },
    })
      .then((resp) => {
        res.send(resp);
      })
      .catch((e) => {
        console.log(e);
      });
  },

  getDataRestaurant(req, res) {
    const id = req.params.id;
    Restaurant.findOne({
      where: { id: id },
    })
      .then((resp) => {
        res.send(resp);
      })
      .catch((e) => {
        console.log(e);
      }); 
  },

  deleteRestaurant(req, res) {
    const id = req.params.id;
    try {
      const restaurant = Restaurant.findOne({
        where: {
          id: id,
        },
      });
      if (!restaurant) {
        res.send("Non abbiamo trovato il ristorante!");
      } else {
        Restaurant.destroy({
          where: {
            id: id,
          },
        });
        res.json({ msg: "Ristorante calcellato con successo!" });
      }
    } catch (error) {
      console.log(error);
    }
  },
};
