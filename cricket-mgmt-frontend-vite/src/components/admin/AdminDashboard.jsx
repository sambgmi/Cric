import { useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaUsers, FaTrophy, FaClipboardList, FaUserCog } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/login');
    }
  }, []);

  const dashboardItems = [
    {
      title: 'Tournament Management',
      description: 'Create and manage tournaments',
      icon: <FaTrophy />,
      path: '/admin/tournaments'
    },
    {
      title: 'Player Management',
      description: 'Manage player registrations',
      icon: <FaUsers />,
      path: '/admin/players'
    },
    {
      title: 'Match Management',
      description: 'Schedule and manage matches',
      icon: <FaClipboardList />,
      path: '/admin/matches'
    },
    {
      title: 'User Management',
      description: 'Manage system users',
      icon: <FaUserCog />,
      path: '/admin/users'
    }
  ];

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Welcome, {user?.name}</h2>
      <Row>
        {dashboardItems.map((item, index) => (
          <Col md={3} key={index} className="mb-4">
            <Card 
              className="h-100 shadow-sm" 
              onClick={() => navigate(item.path)}
              style={{ cursor: 'pointer' }}
            >
              <Card.Body className="text-center">
                <div className="mb-3">
                  {item.icon}
                </div>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>{item.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default AdminDashboard;