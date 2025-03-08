import { useState, useEffect } from 'react';
import { Container, Card, Button, Form, Row, Col, Alert } from 'react-bootstrap';
import { getTournaments } from '../../services/tournamentService';
import axios from 'axios';
import "./Tournmentreg.css"


// Static array to store teams
const teamsArray = [];

function TournamentRegistration() {
  const [teamName, setTeamName] = useState('');
  const [players, setPlayers] = useState(Array(11).fill({ name: '', role: '' }));
  const [success, setSuccess] = useState('');

  const handlePlayerChange = (index, field, value) => {
    const newPlayers = [...players];
    newPlayers[index] = { ...newPlayers[index], [field]: value };
    setPlayers(newPlayers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Store in local array
    teamsArray.push({
      teamName,
      players
    });

    // Always show success
    setSuccess('Team registered successfully!');
    
    // Reset form
    setTeamName('');
    setPlayers(Array(11).fill({ name: '', role: '' }));
    
    // Log the stored team
    console.log('Team stored locally:', teamsArray);
  };
  return (
    <Container className="mt-4">
      <h2 className="mb-4">Team Registration</h2>
      
      {success && <Alert variant="success" onClose={() => setSuccess('')} dismissible>{success}</Alert>}

      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4">
              <Form.Label><strong>Team Name</strong></Form.Label>
              <Form.Control
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="Enter team name"
                required
              />
            </Form.Group>

            <h5 className="mb-3">Player Details</h5>
            {players.map((player, index) => (
              <Card key={index} className="mb-3">
                <Card.Body>
                  <Row>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label><strong>Player {index + 1} Name</strong></Form.Label>
                        <Form.Control
                          type="text"
                          value={player.name}
                          onChange={(e) => handlePlayerChange(index, 'name', e.target.value)}
                          placeholder={`Enter player ${index + 1} name`}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label><strong>Role</strong></Form.Label>
                        <Form.Select
                          value={player.role}
                          onChange={(e) => handlePlayerChange(index, 'role', e.target.value)}
                          required
                        >
                          <option value="">Select Role</option>
                          <option value="Batsman">Batsman</option>
                          <option value="Bowler">Bowler</option>
                          <option value="All-Rounder">All-Rounder</option>
                          <option value="Wicket-Keeper">Wicket-Keeper</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            ))}

            <Button 
              type="submit" 
              variant="primary" 
              size="lg"
              className="w-100 mt-3"
              disabled={!teamName.trim() || players.some(p => !p.name.trim() || !p.role)}
            >
              Register Team
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default TournamentRegistration;