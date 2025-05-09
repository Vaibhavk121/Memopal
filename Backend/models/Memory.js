const mongoose = require('mongoose');

const MemorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  personName: {
    type: String,
    required: [true, 'Please add a name for this person']
  },
  relationship: {
    type: String,
    default: ''
  },
  cues: [{
    type: String
  }],
  images: [{
    type: String
  }],
  videos: [{
    type: String
  }],
  conversations: [{
    date: {
      type: Date,
      default: Date.now
    },
    content: {
      type: String
    }
  }],
  notes: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Memory', MemorySchema);