const express = require("express");

const apiRouter = (knex) => {
  const router = express.Router();

  router.post("/", async (req, res) => {
    const { name, password } = req.body;
    // session に情報を詰める
    // せめてBase64とかにしたい
    req.session.name = name;
    req.session.password = password;

    res.redirect("/cl");
  });

  return router;
};

module.exports = apiRouter;
