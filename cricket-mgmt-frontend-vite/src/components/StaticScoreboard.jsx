import React from 'react';
import { Card, Container, Row, Col, Table } from 'react-bootstrap';
import './StaticScoreboard.css';

const StaticScoreboard = () => {
  return (
    <Container className="mt-4">
      <Card className="scoreboard-card">
        <Card.Header className="text-center bg-dark text-white">
          <h3>IPL 2024 - Live Match</h3>
          <p>Mumbai Indians vs Chennai Super Kings</p>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={6} className="text-center border-end">
              <h4>Mumbai Indians</h4>
              <h2>186/4</h2>
              <p>(18.2 Overs)</p>
              <Table striped bordered>
                <thead>
                  <tr>
                    <th>Batsman</th>
                    <th>R</th>
                    <th>B</th>
                    <th>4s</th>
                    <th>6s</th>
                    <th>SR</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Rohit Sharma*</td>
                    <td>82</td>
                    <td>54</td>
                    <td>8</td>
                    <td>4</td>
                    <td>151.85</td>
                  </tr>
                  <tr>
                    <td>H Pandya</td>
                    <td>45</td>
                    <td>28</td>
                    <td>4</td>
                    <td>2</td>
                    <td>160.71</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
            <Col md={6} className="text-center">
              <h4>Chennai Super Kings</h4>
              <h2>142/6</h2>
              <p>(15.4 Overs)</p>
              <Table striped bordered>
                <thead>
                  <tr>
                    <th>Bowler</th>
                    <th>O</th>
                    <th>M</th>
                    <th>R</th>
                    <th>W</th>
                    <th>ECO</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>J Bumrah</td>
                    <td>4.0</td>
                    <td>0</td>
                    <td>28</td>
                    <td>3</td>
                    <td>7.00</td>
                  </tr>
                  <tr>
                    <td>M Kumar</td>
                    <td>3.4</td>
                    <td>0</td>
                    <td>32</td>
                    <td>2</td>
                    <td>8.72</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col className="text-center">
              <div className="match-info">
                <p className="mb-1">Required Rate: 11.24</p>
                <p className="mb-1">CSK need 45 runs from 26 balls</p>
                <p className="text-primary">Mumbai Indians are ahead by 24 runs (DLS)</p>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default StaticScoreboard;