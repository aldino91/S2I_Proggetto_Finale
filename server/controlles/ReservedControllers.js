const { Reserved, Client, State } = require("../models/index");

module.exports = {
  async AddReserved(req, res) {
    const { pax, name, telephone, hour, data, waiter, idRestaurant, timezone } =
      req.body;

    try {
      await console.log("stiamo aggiungengo una prenotazione!");

      await Client.findOne({
        where: { telephone: telephone, name: name },
      }).then((res) => {
        console.log("Cliente trovato! 1");
        if (!res) {
          Client.create({
            name,
            telephone,
            idRestaurant,
          }).then((response) => {
            console.log("Cliente Creato! 1");
            State.create({
              statereserved: "reservation made",
            }).then((resp) => {
              console.log("STATE CREATO! 1");
              Client.findOne({
                where: { telephone, name },
              }).then((res) => {
                console.log("Cliente trovato! 2");
                Reserved.create({
                  pax,
                  idClient: res.id,
                  hour,
                  data,
                  waiter,
                  idRestaurant,
                  timezone,
                  idState: resp.id,
                }).then((reserved) => {
                  console.log("prenotazione creata! 1");
                });
              });
            });
          });
        } else {
          State.create({
            statereserved: "reservation made",
          }).then((resp) => {
            console.log("STATE CREATO! 2");
            Client.findOne({
              where: { telephone, name },
            }).then((res) => {
              console.log("Cliente trovato! 3");
              Reserved.create({
                pax,
                idClient: res.id,
                hour,
                data,
                waiter,
                idRestaurant,
                timezone,
                idState: resp.id,
              }).then((response) => {
                console.log("Cliente creato correttamente! 3");
              });
            });
          });
        }
      });

      res.status().send(200);
    } catch (error) {
      console.log(error.messagge);
    }
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
/* Client.findOne({
      where: { telephone: telephone, name: name },
    })
      .then((res) => {
        console.log("Cliente trovato! 1");
        if (!res) {
          Client.create({
            name,
            telephone,
            idRestaurant,
          }).then((response) => {
            console.log("Cliente Creato! 1");
            State.create({
              statereserved: "reservation made",
            }).then((resp) => {
              console.log("STATE CREATO! 1");
              Client.findOne({
                where: { telephone, name },
              }).then((res) => {
                console.log("Cliente trovato! 2");
                Reserved.create({
                  pax,
                  idClient: res.id,
                  hour,
                  data,
                  waiter,
                  idRestaurant,
                  timezone,
                  idState: resp.id,
                }).then((reserved) => console.log("prenotazione creata! 1"));
              });
            });
          });
        } else {
          State.create({
            statereserved: "reservation made",
          }).then((resp) => {
            console.log("STATE CREATO! 2");
            Client.findOne({
              where: { telephone, name },
            }).then((res) => {
              console.log("Cliente trovato! 2");
              Reserved.create({
                pax,
                idClient: res.id,
                hour,
                data,
                waiter,
                idRestaurant,
                timezone,
                idState: resp.id,
              }).then((res) => console.log("Cliente trovato! 3"));
            });
          });
        } */
/* }).then(
        (usuario) => res.status(200)
            res.json({ msg: "dati salvati correttamente!" })
            console.log("prenotazione realizzata con successo!! 2")

      )
      .catch((error) => res.send(error.messagge));
    console.log("abbiamo problemi ad realizzare la prenotazione!! 2"); */
