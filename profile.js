const express = require('express');
const multer = require('multer');
const User = require('../models/user');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

// Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

function safeParseArray(data) {
  try {
    return Array.isArray(data) ? data : JSON.parse(data || '[]');
  } catch {
    return [];
  }
}

// PUT /api/profile
router.put('/', [auth, upload.single('photo')], async (req, res) => {
  try {
    const {
      name, location, phone,
      skillsOffered, skillsWanted,
      availability, profession, visibility
    } = req.body;

    const updateData = {
      name,
      location,
      phone,
      skillsOffered: safeParseArray(skillsOffered),
      skillsWanted: safeParseArray(skillsWanted),
      availability: safeParseArray(availability),
      profession: safeParseArray(profession),
      visibility: visibility === 'true'
    };

    if (req.file) {
      updateData.profilePhoto = req.file.path;
    }

    const user = await User.findByIdAndUpdate(req.user.id, updateData, { new: true });
    res.json(user);
  } catch (err) {
    console.error('POST /profile update error:', err.stack || err);
    res.status(500).json({ message: 'Failed to update profile' });
  }
});

module.exports = router;
