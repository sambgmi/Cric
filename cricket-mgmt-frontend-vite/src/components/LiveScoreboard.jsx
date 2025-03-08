import React, { useEffect, useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const LiveScoreboard = () => {
  const [matchData, setMatchData] = useState(() => {
    const savedData = sessionStorage.getItem('matchData');
    return savedData ? JSON.parse(savedData) : {
      teamA: { name: 'Team A', runs: 0, wickets: 0, overs: 0 },
      teamB: { name: 'Team B', runs: 0, wickets: 0, overs: 0 }
    };
  });

  useEffect(() => {
    // Listen for real-time updates
    socket.on('liveScoreUpdate', (update) => {
      setMatchData(prevData => {
        const newData = {
          ...prevData,
          [update.team]: update.currentScore
        };
        sessionStorage.setItem('matchData', JSON.stringify(newData));
        return newData;
      });
    });

    // Load data from sessionStorage on component mount
    const savedData = sessionStorage.getItem('matchData');
    if (savedData) {
      setMatchData(JSON.parse(savedData));
    }

    return () => {
      socket.off('liveScoreUpdate');
    };
  }, []);

  return (
    <Card className="live-scoreboard mb-3">
      <Card.Header className="text-center bg-dark text-white">
        Live Score
      </Card.Header>
      <Card.Body>
        <Row>
          <Col md={6} className="text-center border-end">
            <h4>{matchData.teamA.name}</h4>
            <h3>
              {matchData.teamA.runs}/{matchData.teamA.wickets}
              <small className="text-muted ms-2">
                ({matchData.teamA.overs} ov)
              </small>
            </h3>
          </Col>
          <Col md={6} className="text-center">
            <h4>{matchData.teamB.name}</h4>
            <h3>
              {matchData.teamB.runs}/{matchData.teamB.wickets}
              <small className="text-muted ms-2">
                ({matchData.teamB.overs} ov)
              </small>
            </h3>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default LiveScoreboard;