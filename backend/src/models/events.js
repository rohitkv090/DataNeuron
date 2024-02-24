const mongoose = require('mongoose');
const uuid=require('uuid');

const eventSchema = new mongoose.Schema({
  id: {
    type: String,
    default: () => uuid.v4(),
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
