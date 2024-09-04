import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Assume the admin token is stored in localStorage
  const adminToken = localStorage.getItem('adminToken');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('/api/admin/users', {
          headers: { Authorization: `Bearer ${adminToken}` }
        });
        setUsers(data);
      } catch (error) {
        setError('Failed to fetch users');
        console.error('Failed to fetch users', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [adminToken]);

  const handleDisableUser = async (userId) => {
    try {
      await axios.patch(`/api/admin/users/${userId}/disable`, {}, {
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      setError('Failed to disable user');
      console.error('Failed to disable user', error);
    }
  };

  return (
    <div className="admin-container">
      <h1>Admin Panel</h1>
      <h2>User Management</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <ul>
          {users.length > 0 ? (
            users.map((user) => (
              <li key={user._id}>
                {user.name} - {user.email}
                <button onClick={() => handleDisableUser(user._id)}>Disable</button>
              </li>
            ))
          ) : (
            <p>No users found.</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default AdminPage;
