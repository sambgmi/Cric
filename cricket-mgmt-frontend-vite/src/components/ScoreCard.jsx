import React from 'react';
import { Card } from 'react-bootstrap';

const ScoreCard = ({ matchData }) => {
  const { teamA, teamB } = matchData;
  
  return (
    <Card className="score-card">
      <Card.Body>
        <div className="team-score">
          <h3>{teamA.name}</h3>
          <div className="score">
            {teamA.score}/{teamA.wickets}
            <span className="overs">({teamA.overs})</span>
          </div>
        </div>
        <div className="team-score">
          <h3>{teamB.name}</h3>
          <div className="score">
            {teamB.score}/{teamB.wickets}
            <span className="overs">({teamB.overs})</span>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ScoreCard;