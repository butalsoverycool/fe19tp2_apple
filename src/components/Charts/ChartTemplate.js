import React from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  AreaChart,
  Area,
  Tooltip
} from 'recharts';

const ChartTemplate = props => {
  return (
    <AreaChart
      width={600}
      height={400}
      data={props.data}
      margin={{ top: 0, right: 0, bottom: 0, left: 20 }}
    >
      <CartesianGrid />
      <Area
        type='monotone'
        dataKey='values'
        stroke='#8884d8'
        fill='hotpink'
        strokeWidth={5}
      />
      <XAxis dataKey='year' strokeWidth={2} />
      <YAxis tickMargin={10} strokeWidth={2} domain={['auto', 'auto']} />

      {/* <Tooltip content={<CustomTooltip unit={props.unit} />} /> */}
      <Tooltip />

    </AreaChart>
  );
};

export default ChartTemplate;
