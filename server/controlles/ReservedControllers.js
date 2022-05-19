const { Reserved, Client, State } = require("../models/index");

module.exports = {
  AddReserved(req, res) {
    const { pax, name, telephone, hour, data, waiter, idRestaurant, timezone } =
      req.body;

    Client.findOne({
      where: { telephone: telephone, name: name },
    })
      .then(async (res) => {
        if (!res) {
          await Client.create({
            name,
            telephone,
            idRestaurant,
          });

          await Client.findOne({
            where: { telephone, name },
          }).then(async (resp) => {
            await Reserved.create({
              pax,
              idClient: resp.id,
              hour,
              data,
              waiter,
              idRestaurant,
              timezone,
            });

            await Reserved.findOne({
              where: {
                hour: hour,
                timezone: timezone,
                data: data,
                idClient: resp.id,
                pax: pax,
                idRestaurant: idRestaurant,
              },
            }).then(async (resp) => {
              await State.create({
                statereserved: "reservation made",
                idReserved: resp.id,
              });
              await State.findOne({ where: { idReserved: resp.id } })
                .then(async (res) => {
                  await Reserved.update(
                    {
                      idState: res.id,
                      /* pax,
                      idClient: res.id,
                      hour,
                      data,
                      waiter,
                      idRestaurant,
                      timezone, */
                    },
                    {
                      where: {
                        id: res.id,
                      },
                    }
                  );
                })
                .catch((error) => console.log(error));
            });
          });
        } else {
          await Reserved.create({
            pax,
            idClient: res.id,
            hour,
            data,
            waiter,
            idRestaurant,
            timezone,
          });

          await Reserved.findOne({
            where: {
              hour: hour,
              timezone: timezone,
              data: data,
              idClient: resp.id,
              pax: pax,
              idRestaurant: idRestaurant,
            },
          })
            .then(async (resp) => {
              console.log(resp);
              console.log("Crea lo stato della prenotazione");
              await State.create({
                statereserved: "reservation made",
                idReserved: resp.id,
              });
              await State.findOne({ where: { idReserved: resp.id } })
                .then(async (res) => {
                  await Reserved.update(
                    {
                      idState: res.id,
                      /* pax,
                      idClient: res.id,
                      hour,
                      data,
                      waiter,
                      idRestaurant,
                      timezone, */
                    },
                    { where: { id: res.id } }
                  );
                })
                .catch((error) => console.log(error));
            })
            .catch((error) => console.log(error));
        }
      })
      .then(
        (usuario) => res.status(200).send(usuario),
        res.json({ msg: "dati salvati correttamente!" })
      )
      .catch((error) => res.status(400).send(error));
  },

  SearchReserved(req, res) {
    const { idRestaurant, data, hour } = req.query;

    Reserved.findAll({
      where: { idRestaurant, data, hour },
      include: [{ model: Client }, { model: State }],
    })
      .then((resp) => {
        res.send(resp);
      })
      .catch((e) => {
        console.log(e);
      });
  },

  SearchReservedTimezone(req, res) {
    const { idRestaurant, data, timezone } = req.query;
    Reserved.findAll({
      where: { idRestaurant, data, timezone },
    })
      .then((resp) => {
        res.send(resp);
      })
      .catch((e) => {
        console.log(e);
      });
  },
};
