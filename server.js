// express connection
const express = require("express");
const session = require("express-session");
const app = express();

const setupServer = (knex) => {
  app.use(express.json()); // for parsing application/json
  app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
  app.use(
    session({
      secret: "secret",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: false,
        maxage: 1000 * 60 * 30,
      },
    })
  );

  // swagger config
  const swaggerJSDoc = require("swagger-jsdoc");
  //swaggerの基本定義
  const options = {
    swaggerDefinition: {
      info: {
        title: "HELLO KIMULOG APP",
        version: "1.0.0.",
      },
    },
    apis: ["./**/controller/**/*.js"], //自分自身を指定。外部化した場合は、そのファイルを指定。配列で複数指定も可能。
  };
  const swaggerSpec = swaggerJSDoc(options);

  //swagger-ui向けにjsonを返すAPI
  app.get("/api-docs", function (req, res) {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  // set router
  const router = require("./src/controller/stores");

  // LOG middleware
  app.use((req, res, next) => {
    if (req.method !== "GET") {
      console.log("============= API START =============");
      console.log("Time:", new Date().toLocaleString("ja-JP"));
      console.log("req.method: ", req.method);
      console.log("req.path: ", req.path);
      console.log("req.body: ", req.body);
      console.log("req.params: ", req.params);
      console.log("=====================================");
    }
    next();
  });

  // Authentication middleware
  app.use("/cl", (req, res, next) => {
    console.log("============= Auth START =============");
    if (!req.session.loginId) {
      console.log("session がありません");
      console.log("=====================================");
      req.session.loginId = req.sessionID;
      res.redirect("/login");
    } else {
      if (
        !(
          req.session.name == "kimura" &&
          req.session.password === "password" &&
          req.session.loginId === req.sessionID
        )
      ) {
        console.log("認証失敗のため、ログイン画面へ遷移します");
        console.log("=====================================");
        res.redirect("/login");
      } else {
        console.log("Loginに成功しました。");
        console.log("login name is ", req.session.name);
        console.log("login password is ", req.session.password);
        console.log("=====================================");
        next();
      }
    }
  });

  app.use("/api/v1/login", require("./src/controller/login")());

  app.use("/api/v1/stores", router(knex));

  // routing for static file
  app.use(express.static(`${__dirname}/public`));

  return app;
};

module.exports = setupServer;
