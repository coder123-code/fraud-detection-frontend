import React from 'react';
import { Navbar as BootstrapNavbar, Nav, Container, Button } from 'react-bootstrap';
import { useLocation, Link } from 'react-router-dom';

const Navbar = ({ user, onLogout }) => {
  const location = useLocation();

  return (
    <BootstrapNavbar bg="dark" variant="dark" expand="lg" className="shadow">
      <Container>
        <BootstrapNavbar.Brand>
          🔐 Fraud Detection System
        </BootstrapNavbar.Brand>
        
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/home" active={location.pathname === '/home'}>
              🏠 Home
            </Nav.Link>
            
            <Nav.Link as={Link} to="/alerts" active={location.pathname === '/alerts'}>
              🚨 Alerts
            </Nav.Link>
            
            <Nav.Link as={Link} to="/transactions" active={location.pathname === '/transactions'}>
              📋 Transactions
            </Nav.Link>
          </Nav>
          
          <Nav>
            <BootstrapNavbar.Text className="me-3">
              👤 Welcome, {user.username}
            </BootstrapNavbar.Text>
            <Button variant="outline-light" size="sm" onClick={onLogout}>
              🚪 Logout
            </Button>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;