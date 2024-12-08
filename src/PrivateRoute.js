import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, requiredRole, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [userRole, setUserRole] = useState(null); 

  useEffect(() => {
    const ssn = sessionStorage.getItem('ssn');
    const userType = sessionStorage.getItem('userType');

    if (ssn && userType) {
      setIsAuthenticated(true); 
      setUserRole(userType);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated || userRole !== requiredRole) {
    return <Redirect to="/" />;
  }

  return (
    <Route
      {...rest}
      render={(props) => <Component {...props} />} 
    />
  );
};

export default PrivateRoute;
