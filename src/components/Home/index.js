import React from "react";
import Charts from "../Charts";
import VictoryChart from "../VictoryChart";
import { ScreenBadge } from 'react-awesome-styled-grid'

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      {/* <VictoryChart /> */}

      <Charts />
      <ScreenBadge></ScreenBadge>
    </div>
  );
};

export default Home;
