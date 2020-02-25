import React from 'react';
import Charts from '../Charts';
import VictoryChart from '../VictoryChart';
import { ScreenBadge } from 'react-awesome-styled-grid';

import { withAuthorization } from '../Session';

const HomePage = () => {
  return (
    <div>
      <h1>Home</h1>
      <Charts />
      <ScreenBadge></ScreenBadge>
    </div>
  );
};

const condition = authUser => !!authUser;
export default withAuthorization(condition)(HomePage);
