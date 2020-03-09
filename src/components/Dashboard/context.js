import React, { createContext } from 'react';

const DashboardContext = createContext(null);

export const withDashboard = Component => props => (
  <DashboardContext.Consumer>
    {dashboard => <Component {...props} dashboard={dashboard} />}
  </DashboardContext.Consumer>
);

export default DashboardContext;
