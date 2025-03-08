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
      {/* Your provided About component code */}
    </div>
  );
}

export default About;