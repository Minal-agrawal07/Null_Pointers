const express = require('express');
const router = express.Router();
const User = require('../models/user');

// GET /api/requests - get public profiles
router.get('/', async (req, res) => {
  try {
    const users = await User.find({ visibility: true });

    const result = users.map(user => ({
      id: user._id,
      name: user.name,
      rating: 4.5,  // fake for now
      status: 'pending',
      skillsOffered: (user.skillsOffered || []).join(', '),
      skillsWanted: (user.skillsWanted || []).join(', '),
      profilePhoto: user.profilePhoto || null
    }));

    res.json(result);
  } catch (err) {
    console.error('Error fetching requests:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;


