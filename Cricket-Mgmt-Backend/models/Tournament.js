const mongoose = require('mongoose');

const tournamentSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    unique: true
  },
  format: { 
    type: String, 
    required: true,
    enum: ['Knockout', 'League', 'Round-Robin']
  },
  startDate: { 
    type: Date, 
    required: true 
  },
  endDate: { 
    type: Date, 
    required: true 
  },
  location: { 
    type: String, 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['Upcoming', 'Ongoing', 'Completed'],
    default: 'Upcoming'
  }
}, { timestamps: true });

const Tournament = mongoose.model('Tournament', tournamentSchema);
module.exports = Tournament;