const { State } = require("../models/index");
module.exports = {
  async updateStateReserved(req, res) {
    const { id, statereserved } = req.query;

    try {
      const state = await State.findOne({
        where: {
          id: id,
        },
      });
      await State.update(
        {
          statereserved: statereserved,
        },
        {
          where: { id: state.id },
        }
      );
      res.sendStatus(200);
    } catch (error) {
      res.send("problema per aggiornarlo!!");
      console.log(error);
    }
  },
};
