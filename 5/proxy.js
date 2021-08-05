const express = require("express");
const app = express();
const port = Number.parseInt(process.env.PORT || process.argv[2] || 8080);
const { pid } = process;

app.get("/proxy", (req, res) => {
  let i = 1e7;
  while (i > 0) {
    i--;
  }
  console.log(`Handling request from ${pid}`);
  res.send(`Hello World! from ${pid}`);
});

app.get("/crash", (req, res) => {
  setTimeout(() => {
    console.log(`Crashing ${pid}`);
    throw new Error("Crashed");
  }, 0);
  console.log(`Handling request from ${pid}`);
  res.send("Hello World!");
});

app.listen(port, () => {
  const { pid } = process;
  console.log(`Example app ${pid} listening at http://localhost:${port}`);
});
