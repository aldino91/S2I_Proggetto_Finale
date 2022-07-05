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
    console.log(client);

    try {
      State.create({
        statereserved: "reservation made",
      })
        .then((resp) => {
          Reserved.create({
            pax,
            client,
            hour,
            data,
            telephone,
            waiter,
            idRestaurant,
            timezone,
            idState: resp.id,
          });
        })
        .then((response) => {
          console.log("Cliente creato correttamente! 3");
          res.sendStatus(200);
        });
    } catch (error) {
      console.log(error.messagge);
    }
  },

  getReserved(req, res) {
    const { idRestaurant, data } = req.query;
    Reserved.findAll({
      where: { idRestaurant, data },
      include: [{ model: State }],
    })
      .then((resp) => {
        res.send(resp);
        console.log("Stiamo chiedendo le prenotazioni fatte!");
      })
      .catch((e) => {
        console.log(e);
        console.log("Non possiamo chiedere le prenotazioni!");
      });
  },

  UpdateResereved(req, res) {
    const { pax, hour, data, waiter, idRestaurant, timezone, idReserved } =
      req.body;
    Reserved.findOne({
      where: {
        id: idReserved,
        idRestaurant: idRestaurant,
      },
    })
      .then(async (resp) => {
        await Reserved.update(
          {
            pax: pax,
            hour: hour,
            data: data,
            waiter: waiter,
            timezone: timezone,
          },
          {
            where: {
              id: resp.id,
            },
          }
        );

        await State.update(
          {
            statereserved: "reservation made",
          },
          {
            where: {
              id: resp.idState,
            },
          }
        );

        res.send("prenotazione aggiornata");
      })
      .catch((err) => {
        res.send("problema per aggiornarlo!!");
        console.log(err);
      });
  },

  AddTablesReserved(req, res) {
    const { tables, idReserved, idRestaurant } = req.query;

    Reserved.findOne({
      where: {
        id: idReserved,
        idRestaurant: idRestaurant,
      },
    })
      .then(async (resp) => {
        await Reserved.update(
          {
            tables: tables,
          },
          {
            where: {
              id: resp.id,
            },
          }
        );
        await res.send("tavoli aggiunti");
      })
      .catch((err) => {
        res.send("abbiamo problemi per aggiungere il tavolo");
        console.log(err);
      });
  },
};
