const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  articles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Article'
  }],
  user: {
    type:mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {timestamps: true});


const Author = mongoose.model('Author', authorSchema);

module.exports = Author;
