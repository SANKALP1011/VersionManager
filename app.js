const express = require("express");
const app = express();
const passport = require("passport");
const session = require("express-session");
const GithubStrategy = require("passport-github2").Strategy;
const {
  githubController,
} = require("./Controller/githubStrategies.controller");
const InitialRoutes = require("./Routes/initial.router");
const GithubRoutes = require("./Routes/githubAuth.router");
const ProfileRoutes = require("./Routes/profile.router");
const key = require("./Config/keys.config");
const port = process.env.PORT || "3004";

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
app.use(InitialRoutes);
app.use("/auth", GithubRoutes);
app.use("/auth", ProfileRoutes);

app.listen(port, (err) => {
  if (err) {
  } else {
    console.log("server up and running");
  }
});
