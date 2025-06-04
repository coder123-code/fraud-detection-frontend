// import React, { useState, useEffect } from 'react';
// import { Container, Row, Col, Card, Table, Button, Badge } from 'react-bootstrap';

// const API_BASE = 'http://127.0.0.1:8000';

// const TransactionsPage = ({ user }) => {
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

//   const totalAmount = transactions.reduce((sum, txn) => sum + txn.amount, 0);
//   const fraudCount = transactions.filter(txn => txn.is_fraud).length;
//   const fraudRate = transactions.length > 0 ? (fraudCount / transactions.length) * 100 : 0;

//   return (
//     <Container className="py-5">
//       <Row className="mb-4">
//         <Col>
//           <div className="d-flex justify-content-between align-items-center">
//             <h1 style={{ color: 'white' }}>📋 All Transactions</h1>
//             <Button variant="outline-light" onClick={fetchTransactions}>
//               🔄 Refresh
//             </Button>
//           </div>
//         </Col>
//       </Row>

//       <Row className="mb-4">
//         <Col md={4}>
//           <Card className="text-center">
//             <Card.Body>
//               <Card.Title>📊 Total Transactions</Card.Title>
//               <h2 className="display-4 text-primary">{transactions.length}</h2>
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col md={4}>
//           <Card className="text-center">
//             <Card.Body>
//               <Card.Title>💰 Total Amount</Card.Title>
//               <h2 className="display-4 text-success">${totalAmount.toFixed(2)}</h2>
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col md={4}>
//           <Card className="text-center">
//             <Card.Body>
//               <Card.Title>🚨 Fraud Rate</Card.Title>
//               <h2 className="display-4 text-warning">{fraudRate.toFixed(1)}%</h2>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>

//       <Card className="shadow">
//         <Card.Header className="bg-primary text-white">
//           <h3 className="mb-0">Transaction History</h3>
//         </Card.Header>
//         <Card.Body className="p-0">
//           {loading ? (
//             <div className="text-center py-5">
//               <div className="spinner-border text-primary" />
//               <p className="mt-2">Loading transactions...</p>
//             </div>
//           ) : transactions.length === 0 ? (
//             <div className="text-center py-5">
//               <h3>📝 No transactions yet</h3>
//               <p>Create your first transaction from the Home page.</p>
//             </div>
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
//                 {transactions.map(txn => (
//                   <tr key={txn.id} className={txn.is_fraud ? 'table-danger' : ''}>
//                     <td>{txn.id}</td>
//                     <td>{txn.terminal_id}</td>
//                     <td>${txn.amount}</td>
//                     <td className="text-capitalize">{txn.category}</td>
//                     <td>{new Date(txn.timestamp).toLocaleString()}</td>
//                     <td>
//                       {txn.is_fraud ? (
//                         <Badge bg="danger">🚨 FRAUD</Badge>
//                       ) : (
//                         <Badge bg="success">✅ NORMAL</Badge>
//                       )}
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

// export default TransactionsPage;

import React, { useState, useEffect } from 'react';
import { Container, Table, Button } from 'react-bootstrap';

const API_BASE = 'http://localhost:8000';

const TransactionsPage = ({ user }) => {
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

  return (
    <div className="min-vh-100" style={{ backgroundColor: '#f8f9fa', paddingTop: '2rem' }}>
      <Container>
        
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-dark">Past Transactions</h2>
          <Button variant="outline-primary" onClick={fetchTransactions}>
            Refresh
          </Button>
        </div>

        <div className="bg-white rounded shadow-sm">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" />
              <p className="mt-2 text-muted">Loading transactions...</p>
            </div>
          ) : transactions.length === 0 ? (
            <div className="text-center py-5">
              <h5>No transactions yet</h5>
              <p className="text-muted">Start by creating some transactions.</p>
            </div>
          ) : (
            <Table responsive className="mb-0">
              <thead style={{ backgroundColor: '#6c757d', color: 'white' }}>
                <tr>
                  <th style={{ padding: '1rem', fontWeight: 'normal' }}>Terminal ID</th>
                  <th style={{ padding: '1rem', fontWeight: 'normal' }}>Amount</th>
                  <th style={{ padding: '1rem', fontWeight: 'normal' }}>Category</th>
                  <th style={{ padding: '1rem', fontWeight: 'normal' }}>Date And Time</th>
                  <th style={{ padding: '1rem', fontWeight: 'normal' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map(txn => (
                  <tr key={txn.id} style={{ backgroundColor: '#f8f9fa' }}>
                    <td style={{ padding: '1rem', color: '#495057' }}>{txn.terminal_id}</td>
                    <td style={{ padding: '1rem', color: '#495057' }}>${txn.amount}</td>
                    <td style={{ padding: '1rem', color: '#495057', textTransform: 'capitalize' }}>
                      {txn.category}
                    </td>
                    <td style={{ padding: '1rem', color: '#495057' }}>
                      {new Date(txn.timestamp).toLocaleDateString()} {new Date(txn.timestamp).toLocaleTimeString()}
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <span 
                        className={`badge ${txn.is_fraud ? 'bg-danger' : 'bg-success'}`}
                        style={{ fontSize: '0.8rem' }}
                      >
                        {txn.is_fraud ? 'FRAUD' : 'NORMAL'}
                      </span>
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

export default TransactionsPage;