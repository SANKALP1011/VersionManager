const express = require("express");
const InitialRouter = express.Router();
const { initial } = require("../../Controller/initial.controller");

InitialRouter.get("/", initial);

module.exports = InitialRouter;
