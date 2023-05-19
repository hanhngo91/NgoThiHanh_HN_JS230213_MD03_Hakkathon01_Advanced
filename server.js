const express = require("express");
const server = express();
const fs = require("fs");
const bodyParser = require("body-parser");
const path = require("path");

server.use(express.static(path.join(__dirname, "public")));

const port = 8000;

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

//Middleware check if the input value is empty:
const checkEmpty = (req, res, next) => {
  if (req.body.name === "") {
    return res.status(400).send("Please enter a name");
  }
  next();
};

//Create new game with new players:
server.post("/", checkEmpty, (req, res) => {
  try {
    const { player1, player2, player3, player4 } = req.body;
    let games = JSON.parse(fs.readFileSync("./dev-data/games.json"));
    let newGame = {
      id: 1,
      player1: player1,
      player2: player2,
      player3: player3,
      player4: player4,
    };
    fs.writeFile("./dev-data/games.json", JSON.stringify(newGame), (err) => {
      if (err) {
        return res.status(500).send("Something went wrong");
      } else {
        return res.status(201).send({
          status: "success",
          message: "New game created",
          data: newGame,
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
});

//Get all players in a game:
server.get("/players", (req, res) => {
  try {
    const games = JSON.parse(fs.readFileSync("./dev-data/games.json"));
    res.status(200).send({
      status: "success",
      data: games,
    });
  } catch (err) {
    console.log(err);
  }
});

//Get all rounds:
server.get("/rounds", (req, res) => {
  try {
    const rounds = JSON.parse(fs.readFileSync("./dev-data/rounds.json"));
    res.status(200).send({
      status: "success",
      data: rounds,
    });
  } catch (err) {
    console.log(err);
  }
});

server.get("/", (req, res) => {
  console.log("-------->", __dirname);
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
