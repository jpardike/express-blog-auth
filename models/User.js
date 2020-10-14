const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    minlength: 4,
  },
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

module.exports = User;
