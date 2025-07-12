const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: String,
  phone: String,
  location: String,
  profilePhoto: String,
  skillsOffered: [String],
  skillsWanted: [String],
  availability: [String],
  profession: [String],
  visibility: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', userSchema);
