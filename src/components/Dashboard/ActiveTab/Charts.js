import React from 'react';
import { withDashboard } from '../context';
import Chart from './Chart';

const Charts = props => {
  const { activeTab } = props.dashboard.state;
  const { charts } = activeTab;

  return (
    <>
      {charts.map((chart, nth) => {
        return !chart.disabled ? (
          <Chart
            key={`chart-id-${chart.id}_index-${nth}`}
            chartIndex={nth}
            chart={chart}
          />
        ) : null;
      })}
    </>
  );
};

export default withDashboard(Charts);
