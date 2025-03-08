const express = require("express");
const router = express.Router();
const operatorController = require("../controllers/operatorController");

// Operator control routes
router.post("/score/:matchId", operatorController.updateScore);

module.exports = router;