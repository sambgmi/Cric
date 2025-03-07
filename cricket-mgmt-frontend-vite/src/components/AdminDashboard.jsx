import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaUsers, FaTrophy, FaClipboardList, FaUserCog } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

function AdminDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    // Protect admin route
    if (!user || user.role !== 'admin') {
      navigate('/login');
    }
  }, [user, navigate]);

  const dashboardItems = [
    {
      title: 'Tournament Management',
      description: 'Create and manage tournaments',
      icon: <FaTrophy className="dashboard-icon" />,
      path: '/admin/tournaments',
      color: '#4e73df'
    },
    {
      title: 'Player Management',
      description: 'Manage player registrations',
      icon: <FaUsers className="dashboard-icon" />,
      path: '/admin/players',
      color: '#1cc88a'
    },
    {
      title: 'Match Management',
      description: 'Schedule and manage matches',
      icon: <FaClipboardList className="dashboard-icon" />,
      path: '/admin/matches',
      color: '#36b9cc'
    },
    {
      title: 'User Management',
      description: 'Manage system users',
      icon: <FaUserCog className="dashboard-icon" />,
      path: '/admin/users',
      color: '#f6c23e'
    }
  ];

  return (
    <div className="dashboard-container">
      <Container className="mt-5">
        <div className="dashboard-header mb-5">
          <h2 className="text-primary fw-bold">Welcome, {user?.name}</h2>
          <p className="text-muted">Cricket Tournament Management System</p>
        </div>

        <Row className="g-4">
          {dashboardItems.map((item, index) => (
            <Col md={3} key={index}>
              <Card 
                className="dashboard-card h-100 border-0 shadow-sm hover-effect"
                onClick={() => navigate(item.path)}
                style={{ cursor: 'pointer' }}
              >
                <Card.Body className="d-flex flex-column align-items-center text-center p-4">
                  <div 
                    className="icon-circle mb-4"
                    style={{ backgroundColor: `${item.color}20` }}
                  >
                    {React.cloneElement(item.icon, { style: { color: item.color } })}
                  </div>
                  <Card.Title className="fw-bold">{item.title}</Card.Title>
                  <Card.Text className="text-muted">
                    {item.description}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default AdminDashboard;