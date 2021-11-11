const express = require("express");
const table = "store";

const apiRouter = (knex) => {
  const router = express.Router();

  /**
   * @swagger
   * /api/v1/stores:
   *   get:
   *     description: get store list
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: get store list
   */
  router.get("/", async (req, res) => {
    try {
      const response = await knex.select().from(table);
      res.send({ results: response });
    } catch (error) {
      throw error;
    }
  });

  /**
   * @swagger
   * /api/v1/stores:
   *   post:
   *     description: create new store
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: name
   *         description: storeName
   *         required: true
   *         in: body
   *         type: string
   *       - name: address
   *         description: storeAddress
   *         required: true
   *         in: body
   *         type: string
   *       - name: tel
   *         description: storeTel
   *         required: true
   *         in: body
   *         type: string
   *     responses:
   *       200:
   *         description: create new store
   */
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

  /**
   * @swagger
   * /api/v1/stores/{id}:
   *   patch:
   *     description: update new store
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: name
   *         description: storeName
   *         required: true
   *         in: body
   *         type: string
   *       - name: address
   *         description: storeAddress
   *         required: true
   *         in: body
   *         type: string
   *       - name: tel
   *         description: storeTel
   *         required: true
   *         in: body
   *         type: string
   *     responses:
   *       200:
   *         description: update new store
   */
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

  /**
   * @swagger
   * /api/v1/stores/{id}:
   *   delete:
   *     description: delete new store
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: update new store
   */
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
