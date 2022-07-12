const { Reserved, State } = require("../models/index");

module.exports = {
  async AddReserved(req, res) {
    const {
      pax,
      client,
      telephone,
      hour,
      data,
      waiter,
      idRestaurant,
      timezone,
    } = req.body;

    try {
      const state = await State.create({
        statereserved: "reservation made",
      });

      await Reserved.create({
        pax,
        client,
        hour,
        data,
        telephone,
        waiter,
        idRestaurant,
        timezone,
        idState: state.id,
      });

      res.sendStatus(200);
    } catch (error) {
      console.log(error.messagge);
    }
  },

  async getReserved(req, res) {
    const { idRestaurant, data } = req.query;
    try {
      const reserved = await Reserved.findAll({
        where: { idRestaurant, data },
        include: [{ model: State }],
      });
      res.send(reserved);
    } catch (error) {
      console.log(e);
      console.log("Non possiamo chiedere le prenotazioni!");
    }
  },

  async UpdateResereved(req, res) {
    const { pax, hour, data, waiter, idRestaurant, timezone, idReserved } =
      req.body;

    try {
      const reserved = await Reserved.findOne({
        where: {
          id: idReserved,
          idRestaurant: idRestaurant,
        },
      });

      const update = await Reserved.update(
        {
          pax: pax,
          hour: hour,
          data: data,
          waiter: waiter,
          timezone: timezone,
        },
        {
          where: {
            id: reserved.id,
          },
        }
      );

      await State.update(
        {
          statereserved: "reservation made",
        },
        {
          where: {
            id: reserved.idState,
          },
        }
      );

      res.send("prenotazione aggiornata");
    } catch (error) {
      res.send("problema per aggiornarlo!!");
      console.log(err);
    }
  },

  async AddTablesReserved(req, res) {
    const { tables, idReserved, idRestaurant } = req.query;

    try {
      const reserved = await Reserved.findOne({
        where: {
          id: idReserved,
          idRestaurant: idRestaurant,
        },
      });

      await Reserved.update(
        {
          tables: tables,
        },
        {
          where: {
            id: reserved.id,
          },
        }
      );
      await res.send("tavoli aggiunti");
    } catch (error) {
      res.send("abbiamo problemi per aggiungere il tavolo");
      console.log(err);
    }
  },
};
