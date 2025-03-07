import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaCalendarAlt, FaUsers, FaNewspaper } from 'react-icons/fa';

function FanDashboard() {
  return (
    <div className="dashboard-container">
      <Container className="mt-5">
        <div className="dashboard-header mb-5">
          <h2 className="text-primary fw-bold">Fan Dashboard</h2>
          <p className="text-muted">Stay connected with cricket updates</p>
        </div>
        <Row className="g-4">
          <Col md={4}>
            <Card className="dashboard-card h-100 border-0 shadow-sm hover-effect">
              <Card.Body className="d-flex flex-column align-items-center text-center p-4">
                <div className="icon-circle mb-4">
                  <FaCalendarAlt className="dashboard-icon" />
                </div>
                <Card.Title className="fw-bold">Match Schedule</Card.Title>
                <Card.Text className="text-muted">
                  View upcoming matches and tournaments
                </Card.Text>
                <button className="btn btn-outline-primary mt-auto">View Schedule</button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="dashboard-card h-100 border-0 shadow-sm hover-effect">
              <Card.Body className="d-flex flex-column align-items-center text-center p-4">
                <div className="icon-circle mb-4">
                  <FaUsers className="dashboard-icon" />
                </div>
                <Card.Title className="fw-bold">Teams & Players</Card.Title>
                <Card.Text className="text-muted">
                  Explore teams and player profiles
                </Card.Text>
                <button className="btn btn-outline-primary mt-auto">View Teams</button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="dashboard-card h-100 border-0 shadow-sm hover-effect">
              <Card.Body className="d-flex flex-column align-items-center text-center p-4">
                <div className="icon-circle mb-4">
                  <FaNewspaper className="dashboard-icon" />
                </div>
                <Card.Title className="fw-bold">News & Updates</Card.Title>
                <Card.Text className="text-muted">
                  Stay updated with latest cricket news
                </Card.Text>
                <button className="btn btn-outline-primary mt-auto">View News</button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default FanDashboard;