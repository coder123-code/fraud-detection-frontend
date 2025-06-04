// import React, { useState } from 'react';
// import { Container, Row, Col, Card, Form, Button, Alert, Badge } from 'react-bootstrap';

// const API_BASE = 'http://127.0.0.1:8000';

// const HomePage = ({ user }) => {
//   const [terminalId, setTerminalId] = useState('');
//   const [amount, setAmount] = useState('');
//   const [category, setCategory] = useState('grocery');
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const categories = [
//     'grocery', 'gas', 'shopping', 'entertainment', 
//     'restaurant', 'travel', 'misc'
//   ];

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setResult(null);

//     if (!terminalId || !amount || !category) {
//       setResult({ success: false, message: 'Please fill in all fields' });
//       setLoading(false);
//       return;
//     }

//     if (terminalId < 1 || terminalId > 999) {
//       setResult({ success: false, message: 'Terminal ID must be between 1 and 999' });
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await fetch(`${API_BASE}/transaction`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         credentials: 'include',
//         body: JSON.stringify({
//           terminal_id: parseInt(terminalId),
//           amount: parseFloat(amount),
//           category
//         })
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setResult({ success: true, data });
//         setTerminalId('');
//         setAmount('');
//         setCategory('grocery');
//       } else {
//         const error = await response.json();
//         setResult({ success: false, message: error.detail });
//       }
//     } catch (error) {
//       setResult({ success: false, message: 'Connection failed' });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Container className="py-5">
//       <Row className="justify-content-center">
//         <Col lg={8}>
//           <div className="text-center mb-5" style={{ color: 'white' }}>
//             <h1 className="display-4">Welcome, {user.username}! 👋</h1>
//             <p className="lead">Create a new transaction below</p>
//           </div>

//           <Card className="shadow-lg border-0">
//             <Card.Header className="bg-primary text-white">
//               <h3 className="mb-0">💳 New Transaction</h3>
//             </Card.Header>
//             <Card.Body className="p-4">
//               <Form onSubmit={handleSubmit}>
//                 <Row>
//                   <Col md={6}>
//                     <Form.Group className="mb-3">
//                       <Form.Label>🏪 Terminal ID</Form.Label>
//                       <Form.Control
//                         type="number"
//                         value={terminalId}
//                         onChange={(e) => setTerminalId(e.target.value)}
//                         placeholder="1-999"
//                         min="1"
//                         max="999"
//                         required
//                       />
//                       <Form.Text className="text-muted">
//                         1-499: Low risk | 500-899: Medium risk | 900-999: High risk
//                       </Form.Text>
//                     </Form.Group>
//                   </Col>

//                   <Col md={6}>
//                     <Form.Group className="mb-3">
//                       <Form.Label>💰 Amount ($)</Form.Label>
//                       <Form.Control
//                         type="number"
//                         step="0.01"
//                         value={amount}
//                         onChange={(e) => setAmount(e.target.value)}
//                         placeholder="0.00"
//                         min="0.01"
//                         required
//                       />
//                     </Form.Group>
//                   </Col>
//                 </Row>

//                 <Form.Group className="mb-4">
//                   <Form.Label>📋 Category</Form.Label>
//                   <Form.Select
//                     value={category}
//                     onChange={(e) => setCategory(e.target.value)}
//                     required
//                   >
//                     {categories.map(cat => (
//                       <option key={cat} value={cat}>
//                         {cat.charAt(0).toUpperCase() + cat.slice(1)}
//                       </option>
//                     ))}
//                   </Form.Select>
//                 </Form.Group>

//                 <Button 
//                   type="submit" 
//                   variant="primary" 
//                   size="lg" 
//                   className="w-100"
//                   disabled={loading}
//                 >
//                   {loading ? (
//                     <>
//                       <span className="spinner-border spinner-border-sm me-2" />
//                       Processing...
//                     </>
//                   ) : (
//                     '🚀 Create Transaction'
//                   )}
//                 </Button>
//               </Form>

//               {result && (
//                 <div className="mt-4">
//                   {result.success ? (
//                     <Alert variant="success">
//                       <Alert.Heading>
//                         Transaction {result.data.is_fraud ? '🚨 FLAGGED as FRAUD' : '✅ Approved'}
//                       </Alert.Heading>
//                       <hr />
//                       <Row>
//                         <Col sm={6}>
//                           <strong>Transaction ID:</strong> {result.data.transaction_id}<br />
//                           <strong>Terminal ID:</strong> {result.data.terminal_id}<br />
//                           <strong>Amount:</strong> ${result.data.amount}
//                         </Col>
//                         <Col sm={6}>
//                           <strong>Category:</strong> {result.data.category}<br />
//                           <strong>Status:</strong> {' '}
//                           <Badge bg={result.data.is_fraud ? 'danger' : 'success'}>
//                             {result.data.is_fraud ? '🚨 FRAUD' : '✅ NORMAL'}
//                           </Badge><br />
//                           <strong>Time:</strong> {new Date(result.data.timestamp).toLocaleString()}
//                         </Col>
//                       </Row>
//                     </Alert>
//                   ) : (
//                     <Alert variant="danger">
//                       <strong>Error:</strong> {result.message}
//                     </Alert>
//                   )}
//                 </div>
//               )}
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default HomePage;

import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

const API_BASE = 'http://localhost:8000';

const HomePage = ({ user }) => {
  const [terminalId, setTerminalId] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('grocery');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [debugInfo, setDebugInfo] = useState('');

  const categories = [
    'grocery', 'gas', 'shopping', 'entertainment', 
    'restaurant', 'travel', 'misc'
  ];

  // Check cookies
  const checkCookies = () => {
    const cookies = document.cookie;
    console.log('Current cookies:', cookies);
    
    // Try to extract session_token
    const sessionMatch = cookies.match(/session_token=([^;]+)/);
    const sessionToken = sessionMatch ? sessionMatch[1] : null;
    
    setDebugInfo(`Cookies: ${cookies || 'No cookies found'}\nSession Token: ${sessionToken || 'Not found'}`);
  };

  // Test authentication
  const testAuth = async () => {
    try {
      // Method 1: Try with credentials include
      console.log('Testing /me with credentials...');
      const response1 = await fetch(`${API_BASE}/me`, {
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
      });
      
      console.log('/me response status:', response1.status);
      
      if (response1.ok) {
        const data = await response1.json();
        setDebugInfo(`✅ Auth works: ${JSON.stringify(data)}`);
      } else {
        const error = await response1.text();
        
        // Method 2: Try with manual session token
        const sessionToken = document.cookie.match(/session_token=([^;]+)/)?.[1];
        if (sessionToken) {
          console.log('Trying with manual session token:', sessionToken);
          const response2 = await fetch(`${API_BASE}/me`, {
            headers: { 
              'Content-Type': 'application/json',
              'Cookie': `session_token=${sessionToken}`
            }
          });
          
          if (response2.ok) {
            const data2 = await response2.json();
            setDebugInfo(`✅ Manual token works: ${JSON.stringify(data2)}`);
          } else {
            setDebugInfo(`❌ Both methods failed. Credentials: ${error}`);
          }
        } else {
          setDebugInfo(`❌ No session token found. Error: ${error}`);
        }
      }
    } catch (error) {
      setDebugInfo(`❌ Request failed: ${error.message}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    if (!terminalId || !amount || !category) {
      setResult({ success: false, message: 'Please fill in all fields' });
      setLoading(false);
      return;
    }

    if (terminalId < 1 || terminalId > 999) {
      setResult({ success: false, message: 'Terminal ID must be between 1 and 999' });
      setLoading(false);
      return;
    }

    try {
      const requestData = {
        terminal_id: parseInt(terminalId),
        amount: parseFloat(amount),
        category
      };

      console.log('Sending transaction:', requestData);

      // Try both methods
      let response = await fetch(`${API_BASE}/transaction`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(requestData)
      });

      // If first method fails, try manual session token
      if (!response.ok) {
        const sessionToken = document.cookie.match(/session_token=([^;]+)/)?.[1];
        if (sessionToken) {
          console.log('Retrying with manual session token...');
          response = await fetch(`${API_BASE}/transaction`, {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'Cookie': `session_token=${sessionToken}`
            },
            body: JSON.stringify(requestData)
          });
        }
      }

      console.log('Transaction response status:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('Transaction success:', data);
        setResult({ success: true, data });
        
        setTerminalId('');
        setAmount('');
        setCategory('grocery');
      } else {
        const errorText = await response.text();
        console.log('Transaction error:', errorText);
        
        try {
          const errorData = JSON.parse(errorText);
          setResult({ 
            success: false, 
            message: `${errorData.detail || 'Request failed'} (Status: ${response.status})` 
          });
        } catch {
          setResult({ 
            success: false, 
            message: `Request failed (${response.status}): ${errorText}` 
          });
        }
      }
    } catch (error) {
      console.error('Transaction request error:', error);
      setResult({ success: false, message: `Connection failed: ${error.message}` });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100" style={{ backgroundColor: '#f8f9fa', paddingTop: '2rem' }}>
      <Container>
        <Row className="justify-content-center">
          <Col lg={6}>
            
            <div className="text-center mb-4">
              <h2 className="text-dark">Welcome, {user.username}! 👋</h2>
              <p className="text-muted">Create a new transaction below</p>
              
              {/* Debug buttons */}
              <div className="mb-3">
                <Button 
                  variant="outline-info" 
                  size="sm" 
                  onClick={checkCookies}
                  className="me-2"
                >
                  Check Cookies
                </Button>
                <Button 
                  variant="outline-success" 
                  size="sm" 
                  onClick={testAuth}
                >
                  Test Auth
                </Button>
              </div>
              
              {debugInfo && (
                <Alert variant="info" className="text-start">
                  <small style={{ whiteSpace: 'pre-line' }}>{debugInfo}</small>
                </Alert>
              )}
            </div>

            <div className="bg-white p-4 rounded shadow-sm">
              <div className="bg-primary text-white p-3 rounded mb-4">
                <h4 className="mb-0">💳 New Transaction</h4>
              </div>

              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="text-dark">🏪 Terminal ID:</Form.Label>
                      <Form.Control
                        type="number"
                        value={terminalId}
                        onChange={(e) => setTerminalId(e.target.value)}
                        placeholder="1-999"
                        min="1"
                        max="999"
                        required
                      />
                      <small className="text-muted">
                        1-499: Low risk | 500-899: Medium risk | 900-999: High risk
                      </small>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="text-dark">💰 Amount ($):</Form.Label>
                      <Form.Control
                        type="number"
                        step="0.01"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                        min="0.01"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-4">
                  <Form.Label className="text-dark">📋 Category:</Form.Label>
                  <Form.Select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Button 
                  type="submit" 
                  variant="primary" 
                  className="w-100"
                  disabled={loading}
                  style={{ padding: '12px' }}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" />
                      Processing...
                    </>
                  ) : (
                    '🚀 Create Transaction'
                  )}
                </Button>
              </Form>

              {result && (
                <div className="mt-4">
                  {result.success ? (
                    <Alert variant={result.data.is_fraud ? 'danger' : 'success'}>
                      <Alert.Heading>
                        Transaction {result.data.is_fraud ? '🚨 FLAGGED as FRAUD' : '✅ Approved'}
                      </Alert.Heading>
                      <hr />
                      <Row>
                        <Col sm={6}>
                          <strong>Transaction ID:</strong> {result.data.transaction_id}<br />
                          <strong>Terminal ID:</strong> {result.data.terminal_id}<br />
                          <strong>Amount:</strong> ${result.data.amount}
                        </Col>
                        <Col sm={6}>
                          <strong>Category:</strong> {result.data.category}<br />
                          <strong>Status:</strong> {' '}
                          <span className={`badge ${result.data.is_fraud ? 'bg-danger' : 'bg-success'}`}>
                            {result.data.is_fraud ? '🚨 FRAUD' : '✅ NORMAL'}
                          </span><br />
                          <strong>Time:</strong> {new Date(result.data.timestamp).toLocaleString()}
                        </Col>
                      </Row>
                    </Alert>
                  ) : (
                    <Alert variant="danger">
                      <strong>Error:</strong> {result.message}
                    </Alert>
                  )}
                </div>
              )}
            </div>

          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;