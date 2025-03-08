const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const connectDB = require("./config/db");
const http = require("http");
const socketIo = require("socket.io");

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*" } });

// Middleware
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));
app.use(helmet());
app.use(morgan("dev"));

// Middleware to inject io into requests
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/teams", require("./routes/teamRoutes"));
app.use("/api/players", require("./routes/playerRoutes"));
app.use("/api/tournaments", require("./routes/tournamentRoutes"));
app.use("/api/match", require("./routes/authRoutes"));
app.use("/api/operator", require("./routes/operatorRoutes"));
app.use("/api/players", require("./routes/playerRoutes"));
// Socket.IO connection handling
io.on("connection", (socket) => {
  console.log("A user connected");

  // Join match room as operator
  socket.on("joinMatch", (matchId) => {
    socket.join(matchId);
    console.log(`User joined match: ${matchId}`);
  });

  // Handle score updates
  socket.on("scoreUpdate", (data) => {
    const { matchId, update } = data;
    io.to(matchId).emit("liveScoreUpdate", update);
  });

  socket.on("disconnect", () => console.log("A user disconnected"));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
