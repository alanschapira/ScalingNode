const express = require("express");
const app = express();
const port = 5000;

const wasteTime = () => {
  const filler = [];
  for (let i = 0; i <= 1e8; i++) {
    filler.push("Filler");
  }
};

app.get("/blocking", (req, res) => {
  console.log("starting blocking request");
  console.log("starting to waste time");
  wasteTime();
  console.log("finished wasting time");
  console.log("finished blocking request");
  res.send("All Done!");
});

app.get("/nonBlocking", (req, res) => {
  console.log("starting non blocking request");
  console.log("starting to waste time");
  setTimeout(() => {
    console.log("3 second delay finished");
    console.log("finished non blocking request");
    res.send("All Done!");
  }, 3000);
  console.log("moving on");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
