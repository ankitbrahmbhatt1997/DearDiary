const mongoose = require("mongoose");

let ideaSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  details: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  },
  user: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Idea = mongoose.model("ideas", ideaSchema);

module.exports = {
  Idea
};
