
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
// import './Register.css'; // Ensure your CSS is updated for table styling

// const UserDashboard = () => {
//   const [user, setUser] = useState({});
//   const [transactions, setTransactions] = useState([]);
//   const [amount, setAmount] = useState('');
//   const [transactionType, setTransactionType] = useState('deposit');
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');
//   const API_URL = process.env.REACT_APP_API_URL; // Ensure this is correctly set
//   const navigate = useNavigate(); // Initialize useNavigate for redirection

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = localStorage.getItem('token'); // Retrieve the token from storage

//         if (!token) {
//           setError('No token found. Please log in.');
//           return;
//         }

//         const userResponse = await axios.get(`${API_URL}/api/user`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         setUser(userResponse.data);
//         console.log('User data:', userResponse.data);

//         const transactionsResponse = await axios.get(`${API_URL}/api/transactions`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         console.log('Transactions data:', transactionsResponse.data);
//         setTransactions(transactionsResponse.data);
//       } catch (error) {
//         console.error('Failed to fetch data', error);
//         setTransactions([]);
//         setError('Failed to fetch data. Please check your authentication.');
//         // Redirect to login or handle token expiration
//         if (error.response?.status === 401) {
//           localStorage.removeItem('token'); // Clear invalid token
//           navigate('/'); // Redirect to login page
//         }
//       }
//     };
//     fetchData();
//   }, [API_URL, navigate]);

//   const handleTransaction = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem('token'); // Retrieve the token from storage

//       if (!token) {
//         setError('No token found. Please log in.');
//         return;
//       }

//       await axios.post(`${API_URL}/api/transactions`, {
//         type: transactionType,
//         amount: parseFloat(amount),
//       }, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       setMessage('Transaction successful!');
//       setError('');
//       setAmount('');

//       // Refresh data after successful transaction
//       const userResponse = await axios.get(`${API_URL}/api/user`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUser(userResponse.data);

//       const transactionsResponse = await axios.get(`${API_URL}/api/transactions`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setTransactions(transactionsResponse.data);
//     } catch (error) {
//       console.error('Transaction error:', error);
//       setError('Transaction failed. Please try again.');
//       setMessage('');
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token'); // Remove the token from localStorage
//     navigate('/'); // Redirect to the login page or another route
//   };

//   return (
//     <div className="dashboard-container">
//       <h1>Welcome, {user.name}</h1>
//       <p>Balance: ${user.balance}</p>

//       <button onClick={handleLogout} className="logout-button">Logout</button> {/* Logout Button */}

//       <form onSubmit={handleTransaction} className="transaction-form">
//         <h2>Make a Transaction</h2>
//         <div>
//           <label>
//             Amount:
//             <input
//               type="number"
//               value={amount}
//               onChange={(e) => setAmount(e.target.value)}
//               required
//               min="0"
//             />
//           </label>
//         </div>
//         <div>
//           <label>
//             Type:
//             <select
//               value={transactionType}
//               onChange={(e) => setTransactionType(e.target.value)}
//             >
//               <option value="deposit">Deposit</option>
//               <option value="withdrawal">Withdrawal</option>
//             </select>
//           </label>
//         </div>
//         <button type="submit">Submit</button>
//         {message && <p className="success">{message}</p>}
//         {error && <p className="error">{error}</p>}
//       </form>

//       <h2>Transaction History</h2>
//       <table className="transaction-table">
//         <thead>
//           <tr>
//             <th>Date</th>
//             <th>Type</th>
//             <th>Amount</th>
//           </tr>
//         </thead>
//         <tbody>
//           {transactions.length === 0 ? (
//             <tr>
//               <td colSpan="3">No transactions found</td>
//             </tr>
//           ) : (
//             transactions.map((txn) => (
//               <tr key={txn._id}>
//                 <td>{new Date(txn.date).toLocaleDateString()}</td>
//                 <td>{txn.type}</td>
//                 <td>${txn.amount.toFixed(2)}</td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default UserDashboard;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import '../pages/RegisterPage.css'; // Ensure your CSS is updated for table styling

const UserDashboard = () => {
  const [user, setUser] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState('');
  const [transactionType, setTransactionType] = useState('deposit');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const API_URL = process.env.REACT_APP_API_URL; // Ensure this is correctly set
  const navigate = useNavigate(); // Initialize useNavigate for redirection

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve the token from storage

        if (!token) {
          setError('No token found. Please log in.');
          return;
        }

        const userResponse = await axios.get(`${API_URL}/api/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(userResponse.data);
        console.log('User data:', userResponse.data);

        const transactionsResponse = await axios.get(`${API_URL}/api/transactions`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log('Transactions data:', transactionsResponse.data);
        setTransactions(transactionsResponse.data);
      } catch (error) {
        console.error('Failed to fetch data', error);
        setTransactions([]);
        setError('Failed to fetch data. Please check your authentication.');
        // Redirect to login or handle token expiration
        if (error.response?.status === 401) {
          localStorage.removeItem('token'); // Clear invalid token
          navigate('/'); // Redirect to login page
        }
      }
    };
    fetchData();
  }, [API_URL, navigate]);

  const handleTransaction = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); // Retrieve the token from storage

      if (!token) {
        setError('No token found. Please log in.');
        return;
      }

      await axios.post(`${API_URL}/api/transactions`, {
        type: transactionType,
        amount: parseFloat(amount),
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessage('Transaction successful!');
      setError('');
      setAmount('');

      // Refresh data after successful transaction
      const userResponse = await axios.get(`${API_URL}/api/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(userResponse.data);

      const transactionsResponse = await axios.get(`${API_URL}/api/transactions`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTransactions(transactionsResponse.data);
    } catch (error) {
      console.error('Transaction error:', error);
      setError('Transaction failed. Please try again.');
      setMessage('');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from localStorage
    navigate('/'); // Redirect to the login page or another route
  };

  return (
    <div className="dashboard-container">
      <h1>Welcome, {user.name}</h1>
      <p>Balance: ${user.balance}</p>

      <button onClick={handleLogout} className="logout-button">Logout</button>

      <form onSubmit={handleTransaction} className="transaction-form">
        <h2>Make a Transaction</h2>
        <div>
          <label>
            Amount:
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              min="0"
            />
          </label>
        </div>
        <div>
          <label>
            Type:
            <select
              value={transactionType}
              onChange={(e) => setTransactionType(e.target.value)}
            >
              <option value="deposit">Deposit</option>
              <option value="withdrawal">Withdrawal</option>
            </select>
          </label>
        </div>
        <button type="submit">Submit</button>
        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}
      </form>

      <h2>Transaction History</h2>
      <table className="transaction-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length === 0 ? (
            <tr>
              <td colSpan="3">No transactions found</td>
            </tr>
          ) : (
            transactions.map((txn) => (
              <tr key={txn._id}>
                <td>{new Date(txn.date).toLocaleDateString()}</td>
                <td>{txn.type}</td>
                <td>${txn.amount.toFixed(2)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserDashboard;
