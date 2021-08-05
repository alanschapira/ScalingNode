const express = require("express");
const setupApp = () => {
  const app = express();
  const port = 5000;
  const { pid } = process;
  app.get("/changes", (req, res) => {
    console.log(`Handling request from ${pid}`);
    res.send("Hello Dmitry!!");
  });

  app.listen(port, () => {
    console.log(`Started at ${pid}, listening at http://localhost:${port}`);
  });
};

exports.setupApp = setupApp;
