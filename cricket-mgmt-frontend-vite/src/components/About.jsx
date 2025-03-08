import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaTrophy, FaUsers, FaChartLine } from 'react-icons/fa';
import { GiCricketBat } from 'react-icons/gi';

function About() {
  return (
    <div className="about-page" style={{
      backgroundImage: "url('https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1767&q=80')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh',
      width: '100vw',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'fixed',
      top: 0,
      left: 0,
      overflow: 'auto'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
      }}></div>
      
      <Container className="position-relative" style={{ zIndex: 2 }}>
        <div className="text-center mb-4">
          <Link to="/" className="btn btn-outline-light rounded-circle mb-4">
            <FaArrowLeft />
          </Link>
          <h1 className="text-white mb-3" style={{ 
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            background: 'linear-gradient(to right, #ffffff, #f0f0f0)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>About Cricket Management System</h1>
          <p className="text-light lead">Your comprehensive solution for cricket tournament management</p>
        </div>
        
        <Row className="g-4">
          <Col lg={6}>
            <Card className="border-0 shadow-lg h-100" style={{ 
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              borderRadius: '15px',
              overflow: 'hidden'
            }}>
              <Card.Body className="p-4">
                <h2 className="mb-4 text-primary">Our Mission</h2>
                <p>
                  The Cricket Management System is designed to streamline the organization and management of cricket tournaments, 
                  providing a comprehensive platform for administrators, players, and fans.
                </p>
                <p>
                  Our mission is to simplify the complex process of tournament management, from team registration to 
                  match scheduling, player statistics tracking, and result management - all in one place.
                </p>
                <p>
                  We aim to enhance the cricket experience for everyone involved, making it easier to organize, 
                  participate in, and follow cricket tournaments of all sizes.
                </p>
              </Card.Body>
            </Card>
          </Col>
          
          <Col lg={6}>
            <Card className="border-0 shadow-lg h-100" style={{ 
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              borderRadius: '15px',
              overflow: 'hidden'
            }}>
              <Card.Body className="p-4">
                <h2 className="mb-4 text-primary">Key Features</h2>
                <Row className="g-4">
                  <Col md={6}>
                    <div className="d-flex align-items-center mb-3">
                      <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '50px', height: '50px' }}>
                        <FaTrophy size={20} />
                      </div>
                      <h5 className="mb-0">Tournament Management</h5>
                    </div>
                    <p className="text-muted">Create and manage multiple tournaments with customizable formats</p>
                  </Col>
                  
                  <Col md={6}>
                    <div className="d-flex align-items-center mb-3">
                      <div className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '50px', height: '50px' }}>
                        <FaUsers size={20} />
                      </div>
                      <h5 className="mb-0">Team Registration</h5>
                    </div>
                    <p className="text-muted">Easily register teams and manage player rosters</p>
                  </Col>
                  
                  <Col md={6}>
                    <div className="d-flex align-items-center mb-3">
                      <div className="bg-warning text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '50px', height: '50px' }}>
                        <GiCricketBat size={20} />
                      </div>
                      <h5 className="mb-0">Match Scheduling</h5>
                    </div>
                    <p className="text-muted">Automated fixture generation and scheduling tools</p>
                  </Col>
                  
                  <Col md={6}>
                    <div className="d-flex align-items-center mb-3">
                      <div className="bg-info text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '50px', height: '50px' }}>
                        <FaChartLine size={20} />
                      </div>
                      <h5 className="mb-0">Statistics Tracking</h5>
                    </div>
                    <p className="text-muted">Comprehensive player and team statistics</p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default About;