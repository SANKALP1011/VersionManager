const express = require("express");
const app = express();
const port = process.env.PORT || "3004";

app.listen(port, (err) => {
  if (err) {
  } else {
    console.log("server up and running");
  }
});
