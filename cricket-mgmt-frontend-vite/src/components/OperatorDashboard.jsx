import React, { useState, useEffect } from 'react';
import { Card, Button, ButtonGroup, Row, Col } from 'react-bootstrap';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const OperatorDashboard = () => {
  const [currentTeam, setCurrentTeam] = useState('teamA');
  const [matchData, setMatchData] = useState(() => {
    const savedData = sessionStorage.getItem('matchData');
    return savedData ? JSON.parse(savedData) : {
      teamA: { runs: 0, wickets: 0, overs: 0 },
      teamB: { runs: 0, wickets: 0, overs: 0 }
    };
  });

  useEffect(() => {
    sessionStorage.setItem('matchData', JSON.stringify(matchData));
  }, [matchData]);

  const updateScore = (action, value) => {
    setMatchData(prevData => {
      const newData = { ...prevData };
      
      switch(action) {
        case 'runs':
          newData[currentTeam].runs += value;
          break;
        case 'wicket':
          newData[currentTeam].wickets += value;
          break;
        case 'over':
          newData[currentTeam].overs = Number((newData[currentTeam].overs + value).toFixed(1));
          // Reset to next over if balls reach 6
          if ((newData[currentTeam].overs * 10) % 10 === 6) {
            newData[currentTeam].overs = Math.floor(newData[currentTeam].overs) + 1;
          }
          break;
      }

      // Emit to socket for real-time updates
      socket.emit('scoreUpdate', {
        matchId: 'default_match',
        team: currentTeam,
        action,
        value,
        currentScore: newData[currentTeam]
      });

      return newData;
    });
  };

  return (
    <Card className="operator-dashboard">
      <Card.Header>
        <ButtonGroup className="w-100">
          <Button
            variant={currentTeam === 'teamA' ? 'primary' : 'outline-primary'}
            onClick={() => setCurrentTeam('teamA')}
          >
            Team A ({matchData.teamA.runs}/{matchData.teamA.wickets})
          </Button>
          <Button
            variant={currentTeam === 'teamB' ? 'primary' : 'outline-primary'}
            onClick={() => setCurrentTeam('teamB')}
          >
            Team B ({matchData.teamB.runs}/{matchData.teamB.wickets})
          </Button>
        </ButtonGroup>
        <div className="text-center mt-2">
          Current Over: {matchData[currentTeam].overs}
        </div>
      </Card.Header>
      <Card.Body>
        <Row className="g-2">
          <Col xs={12}>
            <h5>Runs</h5>
            <ButtonGroup className="w-100">
              {[0, 1, 2, 3, 4, 6].map((runs) => (
                <Button
                  key={runs}
                  variant="outline-success"
                  onClick={() => updateScore('runs', runs)}
                >
                  {runs}
                </Button>
              ))}
            </ButtonGroup>
          </Col>
          <Col xs={12}>
            <h5>Actions</h5>
            <ButtonGroup className="w-100">
              <Button 
                variant="outline-danger"
                onClick={() => updateScore('wicket', 1)}
              >
                Wicket
              </Button>
              <Button 
                variant="outline-info"
                onClick={() => updateScore('over', 0.1)}
              >
                Ball
              </Button>
            </ButtonGroup>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default OperatorDashboard;