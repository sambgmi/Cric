import { Container, Row, Col, Card, Button, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaTrophy, FaUserPlus, FaSignInAlt, FaHome, FaInfoCircle } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import "./Home.css"
function Home() {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className="home-container" style={{
      backgroundImage: "url('https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1767&q=80')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      minHeight: '100vh',
      width: '100%',
      height: '100vh',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated overlay with gradient */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 100%)',
        animation: 'pulse 8s infinite alternate'
      }}></div>
      
      {/* Animated particles effect */}
      <div className="particles" style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        zIndex: 1
      }}>
        {[...Array(20)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: `${Math.random() * 10 + 5}px`,
            height: `${Math.random() * 10 + 5}px`,
            background: 'rgba(255, 255, 255, 0.3)',
            borderRadius: '50%',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `float ${Math.random() * 10 + 10}s linear infinite`,
            opacity: Math.random() * 0.5 + 0.1
          }}></div>
        ))}
      </div>
      
      {/* Navigation bar with glass effect */}
      <Nav className={`justify-content-end pt-3 pb-3 position-fixed w-100 z-index-1000 ${scrolled ? 'nav-scrolled' : ''}`} style={{
        background: scrolled ? 'rgba(0, 0, 0, 0.8)' : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        transition: 'all 0.3s ease',
        zIndex: 1000,
        boxShadow: scrolled ? '0 5px 15px rgba(0,0,0,0.1)' : 'none'
      }}>
        <Nav.Item>
          <Link to="/" className="nav-link text-white px-4 nav-hover">
            <FaHome className="me-2" /> Home
          </Link>
        </Nav.Item>
        {/* About link */}
        <Nav.Item>
          <Link to="/about" className="nav-link text-white px-4 nav-hover">
            <FaInfoCircle className="me-2" /> About
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/login" className="nav-link text-white px-4 nav-hover">
            <FaSignInAlt className="me-2" /> Login
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/register" className="nav-link text-white px-4 nav-hover">
            <FaUserPlus className="me-2" /> Register
          </Link>
        </Nav.Item>
      </Nav>
      
      <Container fluid className="position-relative" style={{ zIndex: 2 }}>
        <Row className="justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
          <Col md={10} lg={8} xl={6}>
            <Card className="bg-dark text-white border-0 shadow-lg" style={{ 
              background: 'rgba(0, 0, 0, 0.4)', 
              backdropFilter: 'blur(15px)',
              borderRadius: '20px',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
              transform: 'translateY(0)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}>
              <Card.Body className="p-5">
                <div className="text-center mb-5">
                  <div className="trophy-container" style={{
                    position: 'relative',
                    display: 'inline-block',
                    marginBottom: '30px'
                  }}>
                    <div className="trophy-glow" style={{
                      position: 'absolute',
                      width: '100px',
                      height: '100px',
                      background: 'radial-gradient(circle, rgba(255,215,0,0.4) 0%, rgba(255,215,0,0) 70%)',
                      borderRadius: '50%',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      animation: 'pulse-glow 2s infinite alternate'
                    }}></div>
                    <FaTrophy size={80} className="text-warning position-relative" style={{ 
                      filter: 'drop-shadow(0 0 15px rgba(255, 215, 0, 0.7))'
                    }} />
                  </div>
                  <h1 className="display-4 fw-bold mb-3" style={{ 
                    textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                    background: 'linear-gradient(to right, #ffffff, #f0f0f0)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>Cricket Management System</h1>
                  <p className="lead fs-4" style={{
                    color: '#e0e0e0',
                    maxWidth: '80%',
                    margin: '0 auto'
                  }}>Elevate your cricket tournaments to the next level</p>
                </div>
                
                {/* Dashboard button in the middle instead of login/register */}
                <Row className="justify-content-center mt-5">
                  <Col md={8} lg={6}>
                    <Link to="/admin" style={{ textDecoration: 'none' }}>
                      <Button 
                        variant="warning" 
                        size="lg" 
                        className="w-100 py-3 rounded-pill fw-bold"
                        style={{ 
                          transition: 'all 0.3s ease',
                          background: 'linear-gradient(45deg, #FFD700, #FFA500)',
                          border: 'none',
                          boxShadow: '0 4px 15px rgba(255, 215, 0, 0.3)',
                          position: 'relative',
                          overflow: 'hidden'
                        }}
                      >
                        <span style={{ position: 'relative', zIndex: 2 }}>
                          Enter Dashboard
                        </span>
                      </Button>
                    </Link>
                  </Col>
                </Row>
                
                <div className="text-center mt-5">
                  <p className="text-light fst-italic" style={{
                    borderTop: '1px solid rgba(255,255,255,0.1)',
                    paddingTop: '20px',
                    fontSize: '1.1rem',
                    color: '#d0d0d0'
                  }}>
                    "Cricket is not just a game, it's a passion that unites nations."
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      
      <style jsx>{`
        /* Add these styles to ensure full screen coverage */
        html, body {
          margin: 0;
          padding: 0;
          height: 100%;
          overflow-x: hidden;
        }
        
        body {
          overflow-y: auto;
        }
        
        .home-container {
          min-width: 100vw;
          min-height: 100vh;
        }
        @keyframes pulse {
          0% { opacity: 0.7; }
          100% { opacity: 0.9; }
        }
        
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-100px) rotate(180deg); }
          100% { transform: translateY(-200px) rotate(360deg); opacity: 0; }
        }
        
        @keyframes pulse-glow {
          0% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
          100% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.2); }
        }
        
        .nav-hover {
          position: relative;
          transition: all 0.3s ease;
        }
        
        .nav-hover:after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: 0;
          left: 50%;
          background-color: #FFD700;
          transition: all 0.3s ease;
          transform: translateX(-50%);
        }
        
        .nav-hover:hover:after {
          width: 70%;
        }
        
        .nav-hover:hover {
          color: #FFD700 !important;
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
}

export default Home;