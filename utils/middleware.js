const passport = require("./passport")

const authenticateStudent = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user) => {
      if (err || !user || user.isStudent) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      req.user = user;
      next();
    })(req, res, next);
};
  
const authenticateMentor = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user) => {
      if (err || !user || !user.isStudent) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      req.user = user;
      next();
    })(req, res, next);
};

module.exports = {authenticateMentor, authenticateStudent}