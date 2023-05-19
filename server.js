const express = require("express");
const server = express();
const fs = require("fs");
const bodyParser = require("body-parser");
const path = require("path");

server.use(express.static(path.join(__dirname, "public")));

const port = 8000;

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

server.get("/score", (req, res) => {
  res.sendFile(__dirname + "/public/score.html");
});

server.get("*", (req, res) => {
  res.status(404).send("<h1>Page not found!</h1>");
});

server.listen(port, () => {
  console.log("Server running on port http://localhost:8000");
});
