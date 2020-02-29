import React from 'react';
import styled from 'styled-components';
import { withTheme } from '../Theme';
import { compose } from 'recompose';
import {
  CartesianGrid,
  XAxis,
  YAxis,
  AreaChart,
  Area,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

// tempstyle
const Wrapper = styled.div`
  flex: 1;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const AreaChartTemplate = props => {
  const { color } = props.theme.state;

  return (
    <Wrapper className="ChartTemplate">
      <ResponsiveContainer width={'99%'} height={'99%'}>
        <AreaChart data={props.data}>
          <CartesianGrid />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            fill={color.hex || 'hotpink'}
            strokeWidth={2}
          />
          <XAxis dataKey="year" strokeWidth={2} />
          <YAxis
            tickMargin={10}
            strokeWidth={2}
            domain={['auto', 'auto']}
            dataKey="value"
          />

          {/* <Tooltip content={<CustomTooltip unit={props.unit} />} /> */}
          <Tooltip />
        </AreaChart>
      </ResponsiveContainer>
    </Wrapper>
  );
};

const ChartTemplate = props => {
  if (!props.data) return '';

  let data = props.data;

  if (data.length === 1) {
    data.push(data[0]);
  }

  return <AreaChartTemplate data={data} />;
};

const condition = authUser => !!authUser;
export default compose(withTheme)(AreaChartTemplate);
