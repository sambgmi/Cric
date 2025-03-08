const Match = require("../models/matchSchema");
const Operator = require("../models/Operator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.updateScore = async (req, res) => {
  const { matchId, team, action, value } = req.body;

  try {
    let updateQuery = {};
    
    switch(action) {
      case 'runs':
        updateQuery = { $inc: { [`score.${team}.runs`]: value } };
        break;
      case 'wicket':
        updateQuery = { $inc: { [`score.${team}.wickets`]: 1 } };
        break;
      case 'over':
        updateQuery = { $inc: { [`score.${team}.overs`]: 0.1 } };
        break;
    }

    const match = await Match.findByIdAndUpdate(
      matchId,
      updateQuery,
      { new: true }
    );

    // Emit update via Socket.IO
    req.io.to(matchId).emit("liveScoreUpdate", {
      team,
      action,
      currentScore: match.score[team],
      timestamp: new Date()
    });

    res.json({ success: true, match });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};




// Operator Login
exports.loginOperator = async (req, res) => {
    try {
      const { email, password } = req.body;
      
      // Changed User to Operator model
      const operator = await Operator.findOne({ email });
      if (!operator) {
        return res.status(401).json({ message: 'Invalid operator credentials' });
      }
  
      // Use bcrypt.compare directly since we're using Operator model
      const isMatch = await bcrypt.compare(password, operator.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid operator credentials' });
      }
  
      const token = jwt.sign(
        { id: operator._id, role: operator.role },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );
  
      res.json({
        success: true,
        token,
        operator: {
          id: operator._id,
          name: operator.name,
          email: operator.email,
          role: operator.role
        }
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  
// Operator Registration
exports.registerOperator = async (req, res) => {
  try {
    const { name,email, password } = req.body;

    const existingOperator = await User.findOne({ email });
    if (existingOperator) {
      return res.status(400).json({ message: 'Operator already exists' });
    }

    const operator = await User.create({
      name: email.split('@')[0], // Using email prefix as name
      name,
      email,
      password,
      role: 'operator'
    });

    const token = jwt.sign(
      { id: operator._id, role: operator.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      success: true,
      token,
      operator: {
        id: operator._id,
        email: operator.email,
        role: operator.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
