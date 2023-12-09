const express = require('express');
const router = express.Router();
const { Mentor } = require("../models/")

router.get("/", async (req, res) => {
    try {
        const Mentors = await Mentor.findAll();
        res.json(Mentors);
    } catch (error) {
        console.error('Error fetching Mentors:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

module.exports = router;