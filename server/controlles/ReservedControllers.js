const { Reserved, Client, State } = require("../models/index");

module.exports = {
  async AddReserved(req, res) {
    const { pax, name, telephone, hour, data, waiter, idRestaurant, timezone } =
      req.body;
    console.log(
      /* pax,
      name,
      telephone,
      hour,
      data,
      waiter,
      idRestaurant,
      timezone */
      "stiamo aggiungengo una prenotazione!"
    );

    await Client.findOne({
      where: { telephone: telephone, name: name },
    })
      .then(async (res) => {
        if (!res) {
          await Client.create({
            name,
            telephone,
            idRestaurant,
          }).then((response) => {
            State.create({
              statereserved: "reservation made",
            }).then((resp) => {
              Client.findOne({
                where: { telephone, name },
              }).then((res) => {
                Reserved.create({
                  pax,
                  idClient: res.id,
                  hour,
                  data,
                  waiter,
                  idRestaurant,
                  timezone,
                  idState: resp.id,
                });
              });
            });
          });
        } else {
          await State.create({
            statereserved: "reservation made",
          }).then((resp) => {
            Client.findOne({
              where: { telephone, name },
            }).then((res) => {
              Reserved.create({
                pax,
                idClient: res.id,
                hour,
                data,
                waiter,
                idRestaurant,
                timezone,
                idState: resp.id,
              });
            });
          });
        }
      })
      .then(
        (usuario) => res.status(200).send(usuario),
        res.json({ msg: "dati salvati correttamente!" })
      )
      .catch((error) => res.send(error.messagge));
  },

  SearchReservedTimezone(req, res) {
    const { idRestaurant, data /* timezone */ } = req.query;
    console.log(
      "questi sono i dati passati: ",
      idRestaurant,
      data /* timezone */
    );
    Reserved.findAll({
      where: { idRestaurant, data /* timezone */ },
      include: [{ model: Client }, { model: State }],
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
