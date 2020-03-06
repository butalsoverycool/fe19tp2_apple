import React from 'react';
import { withDashboard } from './context';
import Chart from './Chart';

const Charts = props => {
  const { charts } = props.dashboard.state.activeTab;
  return (
    <>
      {charts.map(chart =>
        !chart.disabled ? <Chart key={chart.id} chart={chart} /> : null
      )}
    </>
  );
};

export default withDashboard(Charts);
