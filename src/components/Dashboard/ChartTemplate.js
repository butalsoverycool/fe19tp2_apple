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
  const unit = props.data[0].substance;
  return (
    <Wrapper className="ChartTemplate">
      <ResponsiveContainer width={'99%'} height={'99%'}>
        <AreaChart data={props.data}>
          <CartesianGrid />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            fill="hotpink"
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

  const data = props.data;

  if (data.length === 1) {
    data.push(data[0]);
  }

  //const unit = props.chart.substances[0].code;

  return <AreaChartTemplate data={data} unit="hej" />;
};

export default ChartTemplate;
