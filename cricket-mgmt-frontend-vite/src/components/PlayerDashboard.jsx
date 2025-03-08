import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { FaUser, FaTrophy, FaChartLine } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./PlayerDashboard.css"
function PlayerDashboard() {
  const [error, setError] = useState('');
  const [playerData, setPlayerData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPlayerData();
  }, []);

  const fetchPlayerData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await axios.get('http://localhost:5000/api/players/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPlayerData(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load player data');
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="dashboard-container">
      <Container className="mt-5">
        {error && <Alert variant="danger" dismissible onClose={() => setError('')}>{error}</Alert>}
        
        <div className="dashboard-header mb-5">
          <h2 className="text-primary fw-bold">Player Dashboard</h2>
          <p className="text-muted">Welcome {playerData?.name || 'Player'}</p>
        </div>

        <Row className="g-4">
          <Col md={4}>
            <Card className="dashboard-card h-100 border-0 shadow-sm hover-effect">
              <Card.Body className="d-flex flex-column align-items-center text-center p-4">
                <div className="icon-circle mb-4">
                  <FaUser className="dashboard-icon" />
                </div>
                <Card.Title className="fw-bold">My Profile</Card.Title>
                <Card.Text className="text-muted">
                  Manage your personal information and cricket profile
                </Card.Text>
                <button 
                  className="btn btn-outline-primary mt-auto"
                  onClick={() => handleNavigation('/player/profile')}
                >
                  View Profile
                </button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="dashboard-card h-100 border-0 shadow-sm hover-effect">
              <Card.Body className="d-flex flex-column align-items-center text-center p-4">
                <div className="icon-circle mb-4">
                  <FaTrophy className="dashboard-icon" />
                </div>
                <Card.Title className="fw-bold">My Tournaments</Card.Title>
                <Card.Text className="text-muted">
                  Track your upcoming matches and tournament schedules
                </Card.Text>
                <button 
                  className="btn btn-outline-primary mt-auto"
                  onClick={() => handleNavigation('/player/tournaments')}
                >
                  View Tournaments
                </button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="dashboard-card h-100 border-0 shadow-sm hover-effect">
              <Card.Body className="d-flex flex-column align-items-center text-center p-4">
                <div className="icon-circle mb-4">
                  <FaChartLine className="dashboard-icon" />
                </div>
                <Card.Title className="fw-bold">My Statistics</Card.Title>
                <Card.Text className="text-muted">
                  View your performance metrics and career statistics
                </Card.Text>
                <button 
                  className="btn btn-outline-primary mt-auto"
                  onClick={() => handleNavigation('/player/stats')}
                >
                  View Stats
                </button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default PlayerDashboard;