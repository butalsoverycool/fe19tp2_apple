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

import CustomTooltip from './CustomTooltip';

const AreaTemplate = props => {
  return (
    <AreaChart
      width={600}
      height={400}
      data={props.data}
      margin={{ top: 5, right: 20, bottom: 5, left: 5 }}
    >
      <Area type="monotone" dataKey="values" stroke="#8884d8" fill="hotpink" />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="year" />
      <YAxis tickMargin={10} domain={['auto', 'auto']} />
      <Tooltip content={<CustomTooltip unit={props.unit} />} />
    </AreaChart>
  );
};

export default AreaTemplate;
