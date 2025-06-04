// // src/App.js - FIXED VERSION
// import React, { useState, useEffect } from 'react';
// import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
// import { Container } from 'react-bootstrap';
// import Navbar from './components/Navbar';
// import LoginPage from './pages/LoginPage';
// import HomePage from './pages/HomePage';
// import AlertsPage from './pages/AlertsPage';
// import TransactionsPage from './pages/TransactionsPage';

// const API_BASE = 'http://127.0.0.1:8000';

// function App() {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   // Check if user is logged in on app start
//   useEffect(() => {
//     checkLoginStatus();
//   }, []);

//   const checkLoginStatus = async () => {
//     try {
//       const response = await fetch(`${API_BASE}/me`, { credentials: 'include' });
//       if (response.ok) {
//         const userData = await response.json();
//         setUser(userData);
//       }
//     } catch (error) {
//       console.log('Not logged in');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogin = async (username, password) => {
//     try {
//       const response = await fetch(`${API_BASE}/login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         credentials: 'include',
//         body: JSON.stringify({ username, password })
//       });

//       if (response.ok) {
//         const userData = await response.json();
//         setUser(userData);
//         navigate('/home');
//         return { success: true };
//       } else {
//         const error = await response.json();
//         return { success: false, error: error.detail };
//       }
//     } catch (error) {
//       return { success: false, error: 'Connection failed' };
//     }
//   };

//   const handleRegister = async (username, password) => {
//     try {
//       const response = await fetch(`${API_BASE}/register`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ username, password })
//       });

//       if (response.ok) {
//         return { success: true, message: 'Registration successful! Please login.' };
//       } else {
//         const error = await response.json();
//         return { success: false, error: error.detail };
//       }
//     } catch (error) {
//       return { success: false, error: 'Connection failed' };
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await fetch(`${API_BASE}/logout`, {
//         method: 'POST',
//         credentials: 'include'
//       });
//       setUser(null);
//       navigate('/login');
//     } catch (error) {
//       console.error('Logout failed:', error);
//     }
//   };

//   if (loading) {
//     return (
//       <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
//         <div className="spinner-border text-primary" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </div>
//       </Container>
//     );
//   }

//   return (
//     <div className="app">
//       {user && <Navbar user={user} onLogout={handleLogout} />}
      
//       <Routes>
//         <Route 
//           path="/login" 
//           element={
//             !user ? (
//               <LoginPage onLogin={handleLogin} onRegister={handleRegister} />
//             ) : (
//               <Navigate to="/home" replace />
//             )
//           } 
//         />
        
//         <Route 
//           path="/home" 
//           element={
//             user ? (
//               <HomePage user={user} />
//             ) : (
//               <Navigate to="/login" replace />
//             )
//           } 
//         />
        
//         <Route 
//           path="/alerts" 
//           element={
//             user ? (
//               <AlertsPage user={user} />
//             ) : (
//               <Navigate to="/login" replace />
//             )
//           } 
//         />
        
//         <Route 
//           path="/transactions" 
//           element={
//             user ? (
//               <TransactionsPage user={user} />
//             ) : (
//               <Navigate to="/login" replace />
//             )
//           } 
//         />
        
//         <Route 
//           path="/" 
//           element={<Navigate to={user ? "/home" : "/login"} replace />} 
//         />
//       </Routes>
//     </div>
//   );
// }

// export default App;

// src/App.js - SIMPLIFIED VERSION
// src/App.js - UPDATED WITH BETTER ERROR HANDLING
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import AlertsPage from './pages/AlertsPage';
import TransactionsPage from './pages/TransactionsPage';

const API_BASE = 'http://localhost:8000'; 

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check if user is logged in on app start
  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const response = await fetch(`${API_BASE}/me`, { 
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      }
    } catch (error) {
      console.log('Not logged in or server not available');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (username, password) => {
    try {
      const response = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        navigate('/home');
        return { success: true };
      } else {
        const error = await response.json();
        return { success: false, error: error.detail || 'Login failed' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Connection failed. Please check if the server is running.' };
    }
  };

  const handleRegister = async (username, password) => {
    try {
      const response = await fetch(`${API_BASE}/register`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        return { success: true, message: 'Registration successful! Please login.' };
      } else {
        const error = await response.json();
        return { success: false, error: error.detail || 'Registration failed' };
      }
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: 'Connection failed. Please check if the server is running.' };
    }
  };

  const handleLogout = async () => {
    try {
      await fetch(`${API_BASE}/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      setUser(null);
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      // Still logout on frontend even if backend fails
      setUser(null);
      navigate('/login');
    }
  };

  // Simple Navigation Header
  const SimpleNavbar = () => (
    <div style={{
      backgroundColor: '#343a40',
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <h4 style={{ color: 'white', margin: 0 }}>Fraud Detection</h4>
      
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <button
          onClick={() => navigate('/home')}
          style={{
            backgroundColor: 'transparent',
            color: 'white',
            border: '1px solid #6c757d',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Home
        </button>
        <button
          onClick={() => navigate('/alerts')}
          style={{
            backgroundColor: 'transparent',
            color: 'white',
            border: '1px solid #6c757d',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Alerts
        </button>
        <button
          onClick={() => navigate('/transactions')}
          style={{
            backgroundColor: 'transparent',
            color: 'white',
            border: '1px solid #6c757d',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Transactions
        </button>
        
        <span style={{ color: '#adb5bd', marginLeft: '1rem' }}>
          Welcome, {user?.username}
        </span>
        <button
          onClick={handleLogout}
          style={{
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f8f9fa'
      }}>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      {user && <SimpleNavbar />}
      
      <Routes>
        <Route 
          path="/login" 
          element={
            !user ? (
              <LoginPage onLogin={handleLogin} onRegister={handleRegister} />
            ) : (
              <Navigate to="/home" replace />
            )
          } 
        />
        
        <Route 
          path="/home" 
          element={
            user ? (
              <HomePage user={user} />
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />
        
        <Route 
          path="/alerts" 
          element={
            user ? (
              <AlertsPage user={user} />
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />
        
        <Route 
          path="/transactions" 
          element={
            user ? (
              <TransactionsPage user={user} />
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />
        
        <Route 
          path="/" 
          element={<Navigate to={user ? "/home" : "/login"} replace />} 
        />
      </Routes>
    </div>
  );
}

export default App;