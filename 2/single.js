const express = require("express");
const app = express();
const port = 5000;

app.get("/single", (req, res) => {
  const { pid } = process;
  let i = 1e7;
  while (i > 0) {
    i--;
  }
  console.log(`Handling request from ${pid}`);
  res.send("Hello World!");
});

app.listen(port, () => {
  const { pid } = process;
  console.log(`Example app ${pid} listening at http://localhost:${port}`);
});
