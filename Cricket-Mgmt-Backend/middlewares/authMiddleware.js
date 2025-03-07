const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Protect routes middleware
const protect = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid Token" });
  }
};

// Admin authorization middleware
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: "Not authorized as admin" });
  }
};

// Player authorization middleware
const player = (req, res, next) => {
  if (req.user && req.user.role === 'player') {
    next();
  } else {
    res.status(403).json({ message: "Not authorized as player" });
  }
};

// Fan authorization middleware
const fan = (req, res, next) => {
  if (req.user && req.user.role === 'fan') {
    next();
  } else {
    res.status(403).json({ message: "Not authorized as fan" });
  }
};

module.exports = { protect, admin, player, fan };
