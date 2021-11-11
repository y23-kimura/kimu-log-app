const express = require("express");
const table = "store";

const apiRouter = (knex) => {
  const router = express.Router();

  // get store list
  /**
   * @swagger
   * /login:
   *   post:
   *     description: Login to the application
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: username
   *         description: Username to use for login.
   *         in: formData
   *         required: true
   *         type: string
   *       - name: password
   *         description: User's password.
   *         in: formData
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: login
   */
  router.get("/", async (req, res) => {
    try {
      const response = await knex.select().from(table);
      res.send({ results: response });
    } catch (error) {
      throw error;
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
  router.patch("/:id(\\d+)/", async (req, res) => {
    try {
      const { body } = req;
      const { id } = req.params;
      // TODO: validation check
      const response = await knex(table)
        .where({ id })
        .update(body)
        .returning("*");
      res.send({ results: response });
    } catch (error) {
      res.status(500).end();
      throw error;
    }
  });

  router.delete("/:id(\\d+)/", async (req, res) => {
    try {
      const { id } = req.params;
      const response = await knex(table).where({ id }).del().returning("*");
      res.send({ results: response });
    } catch (error) {
      res.status(500).end();
      throw error;
    }
  });

  return router;
};

module.exports = apiRouter;
