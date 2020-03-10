import React from 'react';
import { withDashboard } from '../context';
import Chart from './Chart';

import Dnd2 from '../Dnd2';

import { Block, Content } from '../Dnd2';

const Charts = props => {
  const { charts } = props.dashboard.state.activeTab;
  const { toggleDisabledChart } = props.dashboard.setters;
  return (
    <>
      <Dnd2>
        {charts.map((chart, nth) =>
          !chart.disabled ? (
            <Block key={chart.id}>
              <Content>
                <Chart key={chart.id} chartIndex={nth} chart={chart} />
              </Content>
            </Block>
          ) : null
        )}
      </Dnd2>
    </>
  );
};

export default withDashboard(Charts);
