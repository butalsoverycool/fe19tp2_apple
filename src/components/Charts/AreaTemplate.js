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
  const data = props.data.map(item => {
    //item[props.unit] = item.values;
    item = {
      [props.unit]: item.value,
      sector: item.sector,
      substance: item.substance,
      year: item.year,
      value: item.value
    };
    return item;
  });

  return (
    <AreaChart
      width={600}
      height={400}
      data={data}
      margin={{ top: 5, right: 20, bottom: 5, left: 5 }}
    >
      <Area type="monotone" dataKey="value" stroke="#8884d8" fill="hotpink" />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="year" />
      <YAxis tickMargin={10} domain={[0, 'auto']} />
      <Tooltip content={<CustomTooltip unit={props.unit} />} />
    </AreaChart>
  );
};

export default AreaTemplate;
