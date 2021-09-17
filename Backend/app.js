const express = require("express");
const app = express();

app.use((req, res, next) => {
  console.log("BEFORE");
  next();
  console.log("AFTER");
});

app.get("/", (req, res) => {
  console.log(req.params);
  res.send("PAGE");
});

app.all("*", (req, res) => {
  res.status(404).send("WRONG PAGE");
});

app.listen(5000, () => {
  console.log("server is listening for port 5000");
});
