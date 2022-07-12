const { Restaurant } = require("../models/index");

module.exports = {
  async AddRestaurant(req, res) {
    const name = req.body.name;
    const city = req.body.city;
    const telephone = req.body.telephone;
    const address = req.body.address;
    const idUser = req.body.idUser;
    try {
      const restaurant = Restaurant.create({
        name,
        city,
        telephone,
        address,
        idUser,
      });
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      console.log("non siamo riusciti a salvare il ristorante!");
    }
  },

  async getAllRestaurant(req, res) {
    const idUser = req.params.idUser;

    try {
      const restaurant = await Restaurant.findAll({
        where: { idUser: idUser },
      });
      res.send(restaurant);
    } catch (error) {
      console.log(error);
    }
  },

  async getDataRestaurant(req, res) {
    const id = req.params.id;

    try {
      const restaurant = await Restaurant.findOne({
        where: { id: id },
      });
      res.send(restaurant);
    } catch (error) {
      console.log(error);
    }
  },

  async deleteRestaurant(req, res) {
    const id = req.params.id;
    try {
      const restaurant = await Restaurant.findOne({
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
        res.sendStatus(200);
      }
    } catch (error) {
      console.log(error);
    }
  },
};
