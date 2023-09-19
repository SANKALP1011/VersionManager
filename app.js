const express = require("express");
const app = express();
const cron = require("node-cron");
const redis = require("redis");
const passport = require("passport");
const session = require("express-session");
const GithubStrategy = require("passport-github2").Strategy;
const mongoose = require("mongoose");
const {
  githubController,
} = require("./Controller/githubStrategies.controller");
const InitialRoutes = require("./Routes/Initial/initial.router");
const GithubRoutes = require("./Routes/Auth/githubAuth.router");
const RepoRoutes = require("./Routes/Repository/repos.routes");
const ProfileAnalysisRoutes = require("./Routes/Analysis/profileAnalysis.router");
const key = require("./Config/keys.config");
const port = process.env.PORT || 3004;
require("dotenv").config({ path: require("find-config")(".env") });
const { DatabaseError } = require("./Errors/Database/databaseError.error");
const {
  PortNotFreeError,
  ServerRunError,
} = require("./Errors/Server/server.error");

mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => {
    console.log("Database connected");
  })
  .catch((e) => {
    throw new DatabaseError(
      "There is issue while connecting with the database",
      500
    );
  });

var redisConn = redis.createClient();

app.use(
  session({
    secret: "Demo",
    resave: false,
    saveUninitialized: false,
  })
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GithubStrategy(
    {
      clientID: key.GithubKey.ClientId,
      clientSecret: key.GithubKey.ClientSecret,
      callbackURL: key.GithubKey.CallbackUrl,
    },
    githubController
  )
);

app.get("/", (req, res) => {
  res.send("Welcome to the Version Analysis Backend");
});

app.use(InitialRoutes);
app.use("/auth", GithubRoutes);
app.use("/auth", RepoRoutes);
app.use("/auth", ProfileAnalysisRoutes);

app.listen(process.env.PORT || 3004, (err) => {
  if (err) {
    throw new PortNotFreeError(err);
  } else {
    console.log("Server up and running");
  }
});
