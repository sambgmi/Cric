import { Container, Row, Col, Card } from 'react-bootstrap';

function AdminDashboard() {
  return (
    <Container className="mt-4">
      <h2>Admin Dashboard</h2>
      <Row className="mt-4">
        <Col md={4}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Manage Tournaments</Card.Title>
              <Card.Text>Create and manage cricket tournaments</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Manage Teams</Card.Title>
              <Card.Text>Add and manage cricket teams</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Manage Players</Card.Title>
              <Card.Text>Handle player registrations and details</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminDashboard;