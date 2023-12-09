const express = require("express");
const router = express.Router();
const { generateToken } = require("../utils/jwt")
const bcrypt = require("bcrypt")

const { Mentor } = require("../models")

router.post("/signup", async (req, res) => {
    const { email, password, name } = req.body;
  
    const existingMentor = await Mentor.findOne({ where: { email } });
    if (existingMentor) {
      return res.status(400).json({ message: "Email already in use" });
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
  
    await Mentor.create({
      email,
      password: hashedPassword,
      name,
    });
  
    res.status(201).json({ message: "Mentor registered successfully" });
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    const mentor = await Mentor.findOne({ where: { email } });
  
    if (!Mentor || !(await bcrypt.compare(password, mentor.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  
    const token = generateToken({ id: Mentor.id, isStudent: false })
    res.json({ token });
});

module.exports = router