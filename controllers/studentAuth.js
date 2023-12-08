const express = require("express");
const router = express.Router();
const { generateToken } = require("../utils/jwt")
const bcrypt = require("bcrypt")

const { Student } = require("../models")

router.post("/signup", async (req, res) => {
    const { email, password, name } = req.body;
  
    const existingStudent = await Student.findOne({ where: { email } });
    if (existingStudent) {
      return res.status(400).json({ message: "Email already in use" });
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
  
    await Student.create({
      email,
      password: hashedPassword,
      name,
    });
  
    res.status(201).json({ message: "Student registered successfully" });
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    const student = await Student.findOne({ where: { email } });
  
    if (!student || !(await bcrypt.compare(password, student.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  
    const token = generateToken({ id: student.id, isStudent: true })
    res.json({ token });
});

module.exports = router