const hockeyDB = require("./databaseDAL.js");
const express = require("express");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");

const app = express();
const port = 7005;

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ Message: "Welcome to Utah oval mens hockey API" });
});

//Create
app.post("/newTeam", async (req, res) => {
  const apiKey = req.query.apiKey;
  console.log("query param is", apiKey);
  let validKey = await hockeyDB.DAL.isKeyFound(apiKey);
  console.log("KEY IS", validKey);
  if (validKey) {
    const teamName = req.body.Name;
    if (teamName != undefined) {
      let newTeam = {
        Name: teamName,
      };
      let team = await hockeyDB.DAL.CreateTeam(newTeam);
      console.log(team);
      if (team.acknowledged) {
        res.json({ Message: "New team created!", Team: team });
      } else {
        res.json({ Team: team });
      }
    } else {
      return res.json({ Message: "New Team must have some kind of a name" });
    }
  } else {
    return res.json({ Message: "Invalid API key" });
  }
});
//Read
app.get("/teams", async (req, res) => {
  return res.json(await hockeyDB.DAL.GetAllTeams());
});
app.get("/teams/:Id", async (req, res) => {
  let id = req.params.Id;
  return res.json(await hockeyDB.DAL.GetTeamById(id));
});

//Update
app.post("/updateTeam/:Id", async (req, res) => {
  const apiKey = req.query.apiKey;
  let validKey = await hockeyDB.DAL.isKeyFound(apiKey);
  console.log(validKey);
  if (validKey) {
    // Must have Id in params
    // Must have name, wins, loses, ties, and games
    let id = req.params.Id;
    let wins = req.body.wins;
    let ties = req.body.ties;

    let updatedTeam = {
      Name: req.body.name,
      Wins: wins,
      Loses: req.body.loses,
      Ties: ties,
      StandingScore: calculateStandingScore(wins, ties),
      GamesPlayed: req.body.games,
    };
    res.json({
      Message: "Successfully updated team standing",
      Team: await hockeyDB.DAL.UpdateTeamGames(id, updatedTeam),
    });
  } else {
    return res.json({ Message: "New Team must have some kind of a name" });
  }
});

const calculateStandingScore = (wins, ties) => {
  let winTotal = wins * 2;
  let standingScore = winTotal + Number(ties);
  return standingScore;
};

//Delete
app.get("/removeTeam/:Id", async (req, res) => {
  const apiKey = req.query.apiKey;
  let validKey = await hockeyDB.DAL.isKeyFound(apiKey);
  if (validKey) {
    res.json({
      Message: "Team was deleted from database",
      Team: await hockeyDB.DAL.DeleteTeam(req.params.Id),
    });
  } else {
    res.json({ Message: "NOT A VALID API KEY" });
  }
});

app.post("/getKey", async (req, res) => {
  const email = req.body.email;
  let result = await hockeyDB.DAL.getUserEmail(email);
  console.log(result);
  if (result) {
    res.json({ Message: "Key for " + email + " found", User: result });
  } else {
    res.json({ Message: "Not a valid email", Key: "" });
  }
});

app.post("/newUser/", async (req, res) => {
  const email = req.body.Email;
  const username = req.body.Username;
  const password = req.body.Password;
  if (email === undefined || username === undefined || password === undefined) {
    res.json({ Message: "Please have all fields inputted" });
  } else {
    let userExists = await hockeyDB.DAL.getUserEmail(email);
    if (userExists) {
      res.json({ Message: "User's key already exists!", User: userExists });
    }
    //New user API key
    else {
      const key = uuidv4();
      await hockeyDB.DAL.CreateApiUserKey(username, email, password, key);
      let user = await hockeyDB.DAL.getUserEmail(email);
      res.json({
        Message: email + " wasn''t found creating a new user",
        User: user,
      });
    }
  }
});
app.post("/getUserByKey", async (req, res) => {
  const key = req.query.apiKey;

  let userFound = await hockeyDB.DAL.getUserByKey(key);
  if (userFound) {
    res.json({ Message: "User Found", User: userFound });
  } else {
    res.json({ Message: "User Not Found", User: userFound });
  }
});

app.post("/user", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  let userExists = await hockeyDB.DAL.getUser(email, password);
  if (userExists) {
    res.json({ Message: "User Found!", User: userExists });
  }
  //New user API key
  else {
    res.json({ Message: "Invalid login information", User: userExists });
  }
});

app.listen(port, () => {
  console.log("Utah Oval hockey express listening on port: " + port);
});
