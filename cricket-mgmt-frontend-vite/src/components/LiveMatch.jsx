import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import ScoreCard from './ScoreCard';
import MatchStats from './MatchStats';
import LiveFeed from './LiveFeed';

const LiveMatch = () => {
  const { matchId } = useParams();
  const [matchData, setMatchData] = useState({
    teamA: { name: '', score: 0, wickets: 0, overs: 0 },
    teamB: { name: '', score: 0, wickets: 0, overs: 0 },
    currentBatsman: '',
    currentBowler: '',
    lastOver: [],
    recentEvents: []
  });

  useEffect(() => {
    const socket = io('http://localhost:3000');

    socket.emit('joinMatch', matchId);

    socket.on('matchUpdate', (data) => {
      setMatchData(data);
    });

    return () => {
      socket.disconnect();
    };
  }, [matchId]);

  return (
    <Container fluid className="live-match-container">
      <Row>
        <Col md={8}>
          <ScoreCard matchData={matchData} />
          <LiveFeed events={matchData.recentEvents} />
        </Col>
        <Col md={4}>
          <MatchStats matchData={matchData} />
        </Col>
      </Row>
    </Container>
  );
};

export default LiveMatch;