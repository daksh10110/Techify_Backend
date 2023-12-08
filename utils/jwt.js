const jwt = require('jsonwebtoken');
const { SECRET } = require("./config");

function generateToken(user) {
  return jwt.sign(user, SECRET);
}

module.exports = { generateToken };
