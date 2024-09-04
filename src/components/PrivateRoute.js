// import React from 'react';
// import { Navigate, useLocation } from 'react-router-dom';

// const PrivateRoute = ({ element: Element, adminOnly, ...rest }) => {
//   const token = localStorage.getItem('token');
//   const isAdmin = localStorage.getItem('isAdmin') === 'true'; // Example check
//   const location = useLocation();

//   if (!token) {
//     return <Navigate to="/login" state={{ from: location }} />;
//   }

//   if (adminOnly && !isAdmin) {
//     return <Navigate to="/" />;
//   }

//   return <Element />;
// };

// export default PrivateRoute;


import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, adminOnly }) => {
  const token = localStorage.getItem('adminToken') || localStorage.getItem('userToken');
  
  // Check if admin-only route and ensure admin token
  if (adminOnly && !token) {
    return <Navigate to="/admin/login" />;
  }

  // Add additional checks for admin-only if required
  return token ? element : <Navigate to="/admin/login" />;
};

export default PrivateRoute;
