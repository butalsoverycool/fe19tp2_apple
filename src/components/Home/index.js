import React from 'react';
import { withAuthorization } from '../Session';
import Chart from '../Charts';

const HomePage = () => {
  return (
    <div>
      <h1>Home</h1>
      <Chart />
    </div>
  );
};

const condition = authUser => !!authUser;
export default withAuthorization(condition)(HomePage);
