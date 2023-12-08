const express = require("express");
const logger = require("morgan");
require("express-async-errors");
const cors = require("cors");
const passport = require('./utils/passport');
const { generateToken } = require('./utils/jwt');
const app = express();

app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(logger("dev"));

const TestRouter = require("./controllers/Test")
const studentRouter = require("./controllers/studentRouter")
const studentAuth = require("./controllers/studentAuth")

app.use("/", TestRouter);
app.use("/protected", passport.authenticate("jwt", { session: false }), TestRouter);

app.use("/student", studentAuth);
app.use("/students", passport.authenticate("jwt", { session: false }), studentRouter);

module.exports = app