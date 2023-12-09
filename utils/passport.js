const passport = require('passport');
const passportJWT = require('passport-jwt');
const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;
const { SECRET } = require("./config");
const { Student, Mentor } = require("../models")

const jwtOptions = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET,
};

passport.use(
  new JWTStrategy(jwtOptions, async (jwtPayload, done) => {
    try {
      let user;

      if (jwtPayload.isStudent) {
        user = await Student.findByPk(jwtPayload.id);
      } else {
        user = await Mentor.findByPk(jwtPayload.id);
      }

      if (!user) {
        return done(null, false);
      }
      done(null, user);

    } catch (error) {
      return done(error, false);
    }
  })
);

module.exports = passport;