import React, { createContext } from 'react';

// dashboard ctx
const DashboardContext = createContext(null);

// HOC/HOF for consuming dashboard ctx anywhere
export const withDashboard = Component => props => (
  <DashboardContext.Consumer>
    {dashboard => <Component {...props} dashboard={dashboard} />}
  </DashboardContext.Consumer>
);

export default DashboardContext;
