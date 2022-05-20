const { State } = require("../models/index");
module.exports = {
  updateStateReserved(req, res) {
    const { id, statereserved } = req.query;

    State.findOne({
      where: {
        id: id,
      },
    })
      .then((resp) => {
        State.update(
          {
            statereserved: statereserved,
          },
          {
            where: { id: resp.id },
          }
        );

        res.send("stato aggiornato");
      })
      .catch((err) => {
        res.send("problema per aggiornarlo!!");
        console.log(err);
      });
  },
};
