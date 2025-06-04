// import React, { useState } from 'react';
// import { Container, Row, Col, Card, Form, Button, Tab, Tabs, Alert } from 'react-bootstrap';

// const LoginPage = ({ onLogin, onRegister }) => {
//   const [activeTab, setActiveTab] = useState('login');
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage('');

//     if (!username || !password) {
//       setMessage('Please fill in all fields');
//       setLoading(false);
//       return;
//     }

//     const result = activeTab === 'login' 
//       ? await onLogin(username, password)
//       : await onRegister(username, password);

//     if (result.success) {
//       if (activeTab === 'register') {
//         setMessage(result.message);
//         setActiveTab('login');
//         setPassword('');
//       }
//     } else {
//       setMessage(result.error);
//     }
    
//     setLoading(false);
//   };

//   return (
//     <div className="min-vh-100 d-flex align-items-center" style={{
//       background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
//     }}>
//       <Container>
//         <Row className="justify-content-center">
//           <Col md={6} lg={4}>
//             <Card className="shadow-lg border-0">
//               <Card.Body className="p-5">
//                 <div className="text-center mb-4">
//                   <h1 className="h3 mb-3">🔐 Fraud Detection</h1>
//                   <p className="text-muted">Secure transaction monitoring</p>
//                 </div>

//                 <Tabs 
//                   activeKey={activeTab} 
//                   onSelect={(key) => setActiveTab(key)}
//                   className="mb-4"
//                   justify
//                 >
//                   <Tab eventKey="login" title="Login">
//                     <Form onSubmit={handleSubmit}>
//                       <Form.Group className="mb-3">
//                         <Form.Label>Username</Form.Label>
//                         <Form.Control
//                           type="text"
//                           value={username}
//                           onChange={(e) => setUsername(e.target.value)}
//                           placeholder="Enter username"
//                           required
//                         />
//                       </Form.Group>

//                       <Form.Group className="mb-4">
//                         <Form.Label>Password</Form.Label>
//                         <Form.Control
//                           type="password"
//                           value={password}
//                           onChange={(e) => setPassword(e.target.value)}
//                           placeholder="Enter password"
//                           required
//                         />
//                       </Form.Group>

//                       <Button 
//                         type="submit" 
//                         variant="primary" 
//                         className="w-100"
//                         disabled={loading}
//                       >
//                         {loading ? (
//                           <>
//                             <span className="spinner-border spinner-border-sm me-2" />
//                             Logging in...
//                           </>
//                         ) : (
//                           '🔓 Login'
//                         )}
//                       </Button>
//                     </Form>
//                   </Tab>

//                   <Tab eventKey="register" title="Register">
//                     <Form onSubmit={handleSubmit}>
//                       <Form.Group className="mb-3">
//                         <Form.Label>Username</Form.Label>
//                         <Form.Control
//                           type="text"
//                           value={username}
//                           onChange={(e) => setUsername(e.target.value)}
//                           placeholder="Choose username"
//                           required
//                         />
//                       </Form.Group>

//                       <Form.Group className="mb-4">
//                         <Form.Label>Password</Form.Label>
//                         <Form.Control
//                           type="password"
//                           value={password}
//                           onChange={(e) => setPassword(e.target.value)}
//                           placeholder="Choose password"
//                           required
//                         />
//                       </Form.Group>

//                       <Button 
//                         type="submit" 
//                         variant="success" 
//                         className="w-100"
//                         disabled={loading}
//                       >
//                         {loading ? (
//                           <>
//                             <span className="spinner-border spinner-border-sm me-2" />
//                             Registering...
//                           </>
//                         ) : (
//                           '📝 Register'
//                         )}
//                       </Button>
//                     </Form>
//                   </Tab>
//                 </Tabs>

//                 {message && (
//                   <Alert variant={message.includes('successful') ? 'success' : 'danger'}>
//                     {message}
//                   </Alert>
//                 )}
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// };

// export default LoginPage;
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

const API_BASE = 'http://localhost:8000';  // Change from 127.0.0.1:8000

const LoginPage = ({ onLogin, onRegister }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (!username || !password) {
      setMessage('Please fill in all fields');
      setLoading(false);
      return;
    }

    // Debug: Show what we're sending
    console.log('Sending:', { username, password });

    try {
      const endpoint = isLogin ? '/login' : '/register';
      
      // Try the request
      const response = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ username, password })
      });

      console.log('Response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Response data:', data);
        
        if (isLogin) {
          // Call the parent login handler
          const result = await onLogin(username, password);
          if (result.success) {
            // Login successful, will be handled by parent
          } else {
            setMessage(result.error);
          }
        } else {
          setMessage('Registration successful! Please login.');
          setIsLogin(true);
          setPassword('');
        }
      } else {
        // Get error details
        const errorText = await response.text();
        console.log('Error response:', errorText);
        
        try {
          const errorData = JSON.parse(errorText);
          setMessage(errorData.detail || errorData.message || 'Request failed');
        } catch {
          setMessage(`Request failed (${response.status}): ${errorText}`);
        }
      }
    } catch (error) {
      console.error('Request error:', error);
      setMessage('Connection failed. Please check if the server is running.');
    } finally {
      setLoading(false);
    }
  };

  // Test API connection
  const testConnection = async () => {
    try {
      const response = await fetch(`${API_BASE}/`);
      if (response.ok) {
        setMessage('✅ Server connection successful!');
      } else {
        setMessage('❌ Server responded but with error');
      }
    } catch (error) {
      setMessage('❌ Cannot connect to server');
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center" style={{
      backgroundColor: '#343a40'
    }}>
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={4}>
            <div className="bg-white p-4 rounded">
              
              <div className="text-center mb-4">
                <h2 className="text-dark">Please Login</h2>
                <Button 
                  variant="outline-info" 
                  size="sm" 
                  onClick={testConnection}
                  className="mt-2"
                >
                  Test Connection
                </Button>
              </div>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label className="text-dark">User Name:</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="text-dark">Password:</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    required
                  />
                </Form.Group>

                <div className="text-center mb-3">
                  <p className="text-muted small">
                    {isLogin ? "Do not have an account?" : "Already have an account?"}
                  </p>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    type="button"
                    onClick={() => {
                      setIsLogin(!isLogin);
                      setMessage('');
                    }}
                  >
                    {isLogin ? 'Register' : 'Login'}
                  </Button>
                </div>

                <Button 
                  type="submit" 
                  variant="primary" 
                  className="w-100"
                  disabled={loading}
                >
                  {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Register')}
                </Button>
              </Form>

              {message && (
                <Alert 
                  variant={message.includes('successful') || message.includes('✅') ? 'success' : 'danger'}
                  className="mt-3"
                >
                  {message}
                </Alert>
              )}

              {/* Debug info */}
              <div className="mt-3">
                <small className="text-muted">
                  Debug: {isLogin ? 'Login' : 'Register'} mode<br/>
                  API: {API_BASE}
                </small>
              </div>

            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginPage;