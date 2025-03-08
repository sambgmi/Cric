  import { useState, useEffect } from 'react';
  import { Container, Row, Col, Card, Button, Alert, Badge } from 'react-bootstrap';
  import { getTournaments, registerTeam } from '../../services/tournamentService';

  import { useNavigate } from 'react-router-dom';
  // import "./PlayerDashboard.css"
  function PlayerDashboard() {
    const [tournaments, setTournaments] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [playerStats, setPlayerStats] = useState({
      matchesPlayed: 0,
      runs: 0,
      wickets: 0,
      strikeRate: 0,
      economyRate: 0
    });
    const navigate = useNavigate();
    useEffect(() => {
      loadTournaments();
      loadPlayerStats();
    }, []);
    const loadTournaments = async () => {
      try {
        const data = await getTournaments();
        setTournaments(data);
      } catch (err) {
        setError('Failed to load tournaments');
      }
    };
    const loadPlayerStats = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        // Add player stats loading logic here
      } catch (err) {
        console.error('Failed to load player stats');
      }
    };
    // Update the handleRegister function
    const handleRegister = (tournamentId) => {
      navigate(`/tournaments/${tournamentId}/register`);
    };
    // const handleRegister = async (tournamentId) => {
    //   try {
    //     const token = localStorage.getItem('token');
    //     const user = JSON.parse(localStorage.getItem('user'));
        
    //     await registerTeam(tournamentId, {
    //       teamName: `${user.name}'s Team`,
    //       playerId: user.id
    //     }, token);
        
    //     setSuccess('Successfully registered for tournament!');
    //     loadTournaments();
    //   } catch (err) {
    //     setError(err.response?.data?.message || 'Registration failed');
    //   }
    // };
    return (
      <Container fluid className="dashboard-container py-4">
        <Row>
          <Col lg={3}>
            <Card className="stats-card mb-4">
              <Card.Body>
                <Card.Title className="text-primary mb-4">Player Statistics</Card.Title>
                <div className="stat-item">
                  <i className="fas fa-cricket-bat-ball"></i>
                  <h3>{playerStats.matchesPlayed}</h3>
                  <p>Matches Played</p>
                </div>
                <div className="stat-item">
                  <i className="fas fa-running"></i>
                  <h3>{playerStats.runs}</h3>
                  <p>Total Runs</p>
                </div>
                <div className="stat-item">
                  <i className="fas fa-bowling-ball"></i>
                  <h3>{playerStats.wickets}</h3>
                  <p>Wickets Taken</p>
                </div>
              </Card.Body>
            </Card>

            <Card className="performance-card">
              <Card.Body>
                <Card.Title className="text-primary">Performance</Card.Title>
                <div className="performance-item">
                  <span>Strike Rate</span>
                  <h4>{playerStats.strikeRate.toFixed(2)}</h4>
                </div>
                <div className="performance-item">
                  <span>Economy Rate</span>
                  <h4>{playerStats.economyRate.toFixed(2)}</h4>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={9}>
            <h2 className="mb-4">Available Tournaments</h2>
            {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}
            {success && <Alert variant="success" onClose={() => setSuccess('')} dismissible>{success}</Alert>}
            
            <Row className="g-4">
              {tournaments.map((tournament) => (
                <Col md={6} lg={4} key={tournament._id}>
                  <Card className="tournament-card h-100">
                    <Card.Body>
                      <Badge 
                        bg={tournament.status === 'Upcoming' ? 'primary' : 
                            tournament.status === 'Ongoing' ? 'success' : 'secondary'}
                        className="float-end"
                      >
                        {tournament.status}
                      </Badge>
                      <Card.Title className="mb-3">{tournament.name}</Card.Title>
                      <div className="tournament-info">
                        <p><i className="fas fa-trophy"></i> {tournament.format}</p>
                        <p><i className="fas fa-map-marker-alt"></i> {tournament.location}</p>
                        <p><i className="fas fa-calendar"></i> {new Date(tournament.startDate).toLocaleDateString()}</p>
                      </div>
                      {tournament.status === 'Upcoming' && (
                        <Button 
                          variant="outline-primary" 
                          className="w-100 mt-3"
                          onClick={() => handleRegister(tournament._id)}
                        >
                          Register Now
                        </Button>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }

  export default PlayerDashboard;