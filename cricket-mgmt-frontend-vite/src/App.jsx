import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import About from './components/About';
import AdminDashboard from './components/admin/AdminDashboard';
import TournamentManagement from './components/admin/TournamentManagement';
import PlayerTournaments from './components/player/PlayerTournaments';
import PlayerDashboard from './components/player/PlayerDashboard';
import TournamentRegistration from './components/player/TournamentRegistration';  // Updated import path
import LiveScoreboard from './components/LiveScoreboard';
import NewComponent from './components/Chatbot/NewComponent';
import OperatorDashboard from './components/OperatorDashboard';
import Chatbot from './components/Chatbot/Chatbot'; // Adjust the import path if necessary
function App() {
  const [showChatbot, setShowChatbot] = useState(false);

  return (
    <Router>
      <div className="App">
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/tournaments" element={<TournamentManagement />} />
          <Route path="/player/tournaments" element={<PlayerTournaments />} />
          <Route path="/player/dashboard" element={<PlayerDashboard />} />
          <Route path="/tournaments/:id/register" element={<TournamentRegistration />} />
          // Add this route
          {/* <Route path="/live-match/:matchId" element={<LiveMatch />} /> */}
          <Route path="/livescore" element={<LiveScoreboard />}/>
          <Route path="/chatbot" element={<NewComponent/>}/>
          <Route path="/operatordashboard" element={<OperatorDashboard />}/>
        </Routes>
      {/* </div> */}
      {/* Other components and content of your App */}
      
      {/* <button onClick={() => setShowChatbot((prev) => !prev)} id="chatbot-toggler">
        <span className="material-symbols-rounded">chat_bubble</span>
        <span className="material-symbols-rounded">close</span>
      </button>
      
      {showChatbot && (
        <Chatbot showChatbot={showChatbot} setShowChatbot={setShowChatbot} />
      )} */}
    </div>
    </Router>
  );
}

export default App;
