const express = require("express");
const logger = require("morgan");
require("express-async-errors");
const cors = require("cors");
const passport = require('./utils/passport')
const app = express();

app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(logger("dev"));

const studentRouter = require("./controllers/studentRouter")
const studentAuth = require("./controllers/studentAuth")
const mentorAuth = require("./controllers/mentorAuth")
const mentorRouter = require("./controllers/mentorRouter")


app.use("/student", studentAuth);
app.use("/mentor", mentorAuth);

app.use("/students", passport.authenticate("jwt", { session: false }), studentRouter);
app.use("/mentors", passport.authenticate("jwt", { session: false }), mentorRouter);

module.exports = app