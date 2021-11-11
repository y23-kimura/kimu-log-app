const express = require("express");
const table = "store";

const apiRouter = (knex) => {
  const router = express.Router();

  // get store list
  router.get("/", async (req, res) => {
    try {
      const response = await knex.select().from(table);
      res.send({ results: response });
    } catch (error) {
      throw Error(error);
    }
  });

  // post store list
  router.post("/", async (req, res) => {
    try {
      const { body } = req;
      // TODO: validation check
      const { rowCount: count } = await knex(table).insert(body);
      res.send({ results: count });
    } catch (error) {
      res.status(500).end();
      throw error;
    }
  });

  // update store list
  // TODO: 数字だけがインプットされるように修正
  router.patch("/:id(\\d+)/", async (req, res) => {
    try {
      const { body } = req;
      const { id } = req.params;
      // TODO: validation check
      const { rowCount: count } = await knex(table).where({ id }).update(body);
      res.send({ results: count });
    } catch (error) {
      res.status(500).end();
      throw error;
    }
  });

  return router;
};

module.exports = apiRouter;
