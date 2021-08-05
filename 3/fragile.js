const express = require("express");
const { cpus } = require("os");
const cluster = require("cluster");

if (cluster.isMaster) {
  const availableCpus = cpus();
  console.log(`Clustering to ${availableCpus.length} processes`);
  availableCpus.forEach(cluster.fork);
} else {
  const app = express();
  const port = 5000;
  const { pid } = process;
  app.get("/fragile", (req, res) => {
    setTimeout(() => {
      // needs settimeout so its not handled by express
      console.log(`Crashing ${pid}`);
      throw new Error("Crashed");
    }, 0);
    console.log(`Handling request from ${pid}`);
    res.send("Hello World!");
  });

  app.listen(port, () => {
    console.log(`Started at ${pid}, listening at http://localhost:${port}`);
  });
}
