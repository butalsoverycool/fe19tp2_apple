import React from 'react';
import styled from 'styled-components';
import {
  CartesianGrid,
  XAxis,
  YAxis,
  AreaChart,
  Area,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const Wrapper = styled.div`
 width: 90%;
  height: 10rem;
  background: 3rem;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
  .recharts-surface {
    padding: 0;
    margin-left: -5%;
  }
`;

const AreaChartTemplate = props => {
  const unit = props.data[0].substance;
  return (
    <Wrapper className='chart-template'>
      <ResponsiveContainer>
        <AreaChart
          data={props.data}
          margin={{ top: 0, right: 0, bottom: 0, left: 20 }}
        >
          <CartesianGrid />
          <Area
            type='monotone'
            dataKey='values'
            stroke='#8884d8'
            fill='limegreen'
            strokeWidth={2}
          />
          <XAxis dataKey='year' strokeWidth={2} tick={{ fontSize: 12 }} />
          <YAxis
            tickMargin={10}
            tick={{ fontSize: 12 }}
            strokeWidth={2}
            domain={['auto', 'auto']}
          />

          {/* <Tooltip content={<CustomTooltip unit={props.unit} />} /> */}
          <Tooltip />
        </AreaChart>
      </ResponsiveContainer>
    </Wrapper>
  );
};

const ChartTemplate = props => {
  console.log('PROPS DATA', props.data);

  const data = props.data;
  if (data.length === 1) {
    data.push(data[0]);
  }

  return props.data ? (
    <AreaChartTemplate data={props.data} unit={props.unit} />
  ) : null;
};

export default ChartTemplate;
