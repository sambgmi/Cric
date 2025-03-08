import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { getTournaments, registerTeam } from '../../services/tournamentService';

function PlayerTournaments() {
  const [tournaments, setTournaments] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadTournaments();
  }, []);

  const loadTournaments = async () => {
    try {
      const data = await getTournaments();
      setTournaments(data);
    } catch (err) {
      setError('Failed to load tournaments');
    }
  };

  const handleRegister = async (tournamentId) => {
    try {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user'));
      
      await registerTeam(tournamentId, {
        teamName: `${user.name}'s Team`,
        playerId: user.id
      }, token);
      
      setSuccess('Successfully registered for tournament!');
      loadTournaments(); // Refresh the list
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <Container className="mt-4">
      <h2>Available Tournaments</h2>
      {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}
      {success && <Alert variant="success" onClose={() => setSuccess('')} dismissible>{success}</Alert>}
      
      <Row className="g-4 mt-3">
        {tournaments.map((tournament) => (
          <Col md={4} key={tournament._id}>
            <Card>
              <Card.Body>
                <Card.Title>{tournament.name}</Card.Title>
                <Card.Text>
                  <strong>Format:</strong> {tournament.format}<br/>
                  <strong>Location:</strong> {tournament.location}<br/>
                  <strong>Start Date:</strong> {new Date(tournament.startDate).toLocaleDateString()}<br/>
                  <strong>Status:</strong> {tournament.status}
                </Card.Text>
                {tournament.status === 'Upcoming' && (
                  <Button 
                    variant="primary" 
                    onClick={() => handleRegister(tournament._id)}
                  >
                    Register for Tournament
                  </Button>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default PlayerTournaments;