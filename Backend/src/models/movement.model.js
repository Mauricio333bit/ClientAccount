const mongoose = require("mongoose");

const movementSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  type: {
    type: String,
    enum: [""],
  },
});
