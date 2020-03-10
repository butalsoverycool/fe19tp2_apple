import React from 'react';
import { withDashboard } from '../context';
import Chart from './Chart';

const Charts = props => {
  const { charts } = props.dashboard.state.activeTab;
  const { toggleDisabledChart } = props.dashboard.setters;
  return (
    <>
      {charts.map((chart, nth) =>
        !chart.disabled ? (
          <Chart key={chart.id} chartIndex={nth} chart={chart} />
        ) : null
      )}
    </>
  );
};

export default withDashboard(Charts);
