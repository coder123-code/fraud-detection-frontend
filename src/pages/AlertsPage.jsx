// import React, { useState, useEffect } from 'react';
// import { Container, Row, Col, Card, Table, Button, Badge, Alert } from 'react-bootstrap';

// const API_BASE = 'http://127.0.0.1:8000';

// const AlertsPage = ({ user }) => {
//   const [transactions, setTransactions] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchTransactions = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch(`${API_BASE}/transactions`, {
//         credentials: 'include'
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setTransactions(data.transactions);
//       }
//     } catch (error) {
//       console.error('Failed to fetch transactions:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTransactions();
//   }, []);

//   const fraudTransactions = transactions.filter(txn => txn.is_fraud);
//   const totalFraudAmount = fraudTransactions.reduce((sum, txn) => sum + txn.amount, 0);

//   return (
//     <Container className="py-5">
//       <Row className="mb-4">
//         <Col>
//           <div className="d-flex justify-content-between align-items-center">
//             <h1 style={{ color: 'white' }}>🚨 Fraud Alerts</h1>
//             <Button variant="outline-light" onClick={fetchTransactions}>
//               🔄 Refresh
//             </Button>
//           </div>
//         </Col>
//       </Row>

//       <Row className="mb-4">
//         <Col md={6}>
//           <Card className="text-center border-danger">
//             <Card.Body>
//               <Card.Title className="text-danger">🚨 Total Fraud Alerts</Card.Title>
//               <h2 className="display-4 text-danger">{fraudTransactions.length}</h2>
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col md={6}>
//           <Card className="text-center border-danger">
//             <Card.Body>
//               <Card.Title className="text-danger">💰 Total Fraud Amount</Card.Title>
//               <h2 className="display-4 text-danger">${totalFraudAmount.toFixed(2)}</h2>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>

//       <Card className="shadow">
//         <Card.Header className="bg-danger text-white">
//           <h3 className="mb-0">Fraudulent Transactions</h3>
//         </Card.Header>
//         <Card.Body className="p-0">
//           {loading ? (
//             <div className="text-center py-5">
//               <div className="spinner-border text-primary" />
//               <p className="mt-2">Loading alerts...</p>
//             </div>
//           ) : fraudTransactions.length === 0 ? (
//             <Alert variant="success" className="m-4">
//               <Alert.Heading>✅ No fraud detected!</Alert.Heading>
//               <p>All your transactions appear to be legitimate.</p>
//             </Alert>
//           ) : (
//             <Table responsive striped hover className="mb-0">
//               <thead className="table-dark">
//                 <tr>
//                   <th>ID</th>
//                   <th>Terminal</th>
//                   <th>Amount</th>
//                   <th>Category</th>
//                   <th>Time</th>
//                   <th>Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {fraudTransactions.map(txn => (
//                   <tr key={txn.id} className="table-danger">
//                     <td>{txn.id}</td>
//                     <td>{txn.terminal_id}</td>
//                     <td>${txn.amount}</td>
//                     <td>{txn.category}</td>
//                     <td>{new Date(txn.timestamp).toLocaleString()}</td>
//                     <td>
//                       <Badge bg="danger">🚨 FRAUD</Badge>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </Table>
//           )}
//         </Card.Body>
//       </Card>
//     </Container>
//   );
// };

// export default AlertsPage;
// import React, { useState, useEffect } from 'react';
// import { Container, Table, Button } from 'react-bootstrap';

// const API_BASE = 'http://127.0.0.1:8000';

// const AlertsPage = ({ user }) => {
//   const [transactions, setTransactions] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchTransactions = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch(`${API_BASE}/transactions`, {
//         credentials: 'include'
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setTransactions(data.transactions);
//       }
//     } catch (error) {
//       console.error('Failed to fetch transactions:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTransactions();
//   }, []);

//   const fraudTransactions = transactions.filter(txn => txn.is_fraud);

//   return (
//     <div className="min-vh-100" style={{ backgroundColor: '#f8f9fa', paddingTop: '2rem' }}>
//       <Container>
        
//         <div className="d-flex justify-content-between align-items-center mb-4">
//           <h2 className="text-dark">Fraud Alerts</h2>
//           <Button variant="outline-primary" onClick={fetchTransactions}>
//             Refresh
//           </Button>
//         </div>

//         <div className="bg-white rounded">
//           {loading ? (
//             <div className="text-center py-5">
//               <div className="spinner-border text-primary" />
//               <p className="mt-2 text-muted">Loading alerts...</p>
//             </div>
//           ) : fraudTransactions.length === 0 ? (
//             <div className="text-center py-5">
//               <h5 className="text-success">No fraud detected!</h5>
//               <p className="text-muted">All your transactions appear to be legitimate.</p>
//             </div>
//           ) : (
//             <Table responsive className="mb-0">
//               <thead style={{ backgroundColor: '#6c757d', color: 'white' }}>
//                 <tr>
//                   <th style={{ padding: '1rem', fontWeight: 'normal' }}>Terminal ID</th>
//                   <th style={{ padding: '1rem', fontWeight: 'normal' }}>Amount</th>
//                   <th style={{ padding: '1rem', fontWeight: 'normal' }}>Date And Time</th>
//                   <th style={{ padding: '1rem', fontWeight: 'normal' }}>Description</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {fraudTransactions.map(txn => (
//                   <tr key={txn.id} style={{ backgroundColor: '#f8f9fa' }}>
//                     <td style={{ padding: '1rem', color: '#495057' }}>{txn.terminal_id}</td>
//                     <td style={{ padding: '1rem', color: '#495057' }}>${txn.amount}</td>
//                     <td style={{ padding: '1rem', color: '#495057' }}>
//                       {new Date(txn.timestamp).toLocaleDateString()} {new Date(txn.timestamp).toLocaleTimeString()}
//                     </td>
//                     <td style={{ padding: '1rem', color: '#495057' }}>
//                       {txn.category} transaction - FRAUD DETECTED
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </Table>
//           )}
//         </div>

//       </Container>
//     </div>
//   );
// };

// export default AlertsPage;
import React, { useState, useEffect } from 'react';
import { Container, Table, Button } from 'react-bootstrap';

const API_BASE = 'http://localhost:8000';

const AlertsPage = ({ user }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/transactions`, {
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        setTransactions(data.transactions);
      }
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // Filter only fraudulent transactions
  const fraudTransactions = transactions.filter(txn => txn.is_fraud);

  return (
    <div className="min-vh-100" style={{ backgroundColor: '#f8f9fa', paddingTop: '2rem' }}>
      <Container>
        
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-dark">Fraud Alerts</h2>
          <Button variant="outline-primary" onClick={fetchTransactions}>
            Refresh
          </Button>
        </div>

        <div className="bg-white rounded shadow-sm">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" />
              <p className="mt-2 text-muted">Loading alerts...</p>
            </div>
          ) : fraudTransactions.length === 0 ? (
            <div className="text-center py-5">
              <h5 className="text-success">No fraud detected!</h5>
              <p className="text-muted">All your transactions appear to be legitimate.</p>
            </div>
          ) : (
            <Table responsive className="mb-0">
              <thead style={{ backgroundColor: '#6c757d', color: 'white' }}>
                <tr>
                  <th style={{ padding: '1rem', fontWeight: 'normal' }}>Terminal ID</th>
                  <th style={{ padding: '1rem', fontWeight: 'normal' }}>Amount</th>
                  <th style={{ padding: '1rem', fontWeight: 'normal' }}>Date And Time</th>
                  <th style={{ padding: '1rem', fontWeight: 'normal' }}>Description</th>
                </tr>
              </thead>
              <tbody>
                {fraudTransactions.map(txn => (
                  <tr key={txn.id} style={{ backgroundColor: '#f8f9fa' }}>
                    <td style={{ padding: '1rem', color: '#495057' }}>{txn.terminal_id}</td>
                    <td style={{ padding: '1rem', color: '#495057' }}>${txn.amount}</td>
                    <td style={{ padding: '1rem', color: '#495057' }}>
                      {new Date(txn.timestamp).toLocaleDateString()} {new Date(txn.timestamp).toLocaleTimeString()}
                    </td>
                    <td style={{ padding: '1rem', color: '#495057' }}>
                      {txn.category} transaction - FRAUD DETECTED
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>

      </Container>
    </div>
  );
};

export default AlertsPage;