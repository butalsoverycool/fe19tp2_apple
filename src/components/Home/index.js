import React from 'react';
import { withAuthorization } from '../Session';
import Chart from '../Charts';
import Data from '../Data';

const HomePage = () => {
  return (
    <div>
      Home
      <Chart />
      <Data />
    </div>
  );
};

const condition = authUser => !!authUser;
export default withAuthorization(condition)(HomePage);
