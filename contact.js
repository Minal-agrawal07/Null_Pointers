const express = require('express');
const Contact = require('../models/contact');

const router = express.Router();

// POST /api/contact
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newQuery = new Contact({ name, email, message });
    await newQuery.save();

    res.status(201).json({ msg: "Query submitted successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Something went wrong." });
  }
});

module.exports = router;