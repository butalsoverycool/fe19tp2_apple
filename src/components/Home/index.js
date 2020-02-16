import React from 'react';
import { withAuthorization } from '../Session';
import Client from '../client';
const HomePage = () => {
  return (
    <div>
      <h1>Home</h1>
      <Client />
    </div>
  );
};

const condition = authUser => !!authUser;
export default withAuthorization(condition)(HomePage);
