const mongoose = require("mongoose");

const operatorSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    default: 'operator',
    immutable: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Operator', operatorSchema);