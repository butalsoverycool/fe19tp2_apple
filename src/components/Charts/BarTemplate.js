import React, { PureComponent } from 'react';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

import CustomTooltip from './CustomTooltip';

const Bars = ({ yAxisId, dataKey, fill }) => {};

const BarTemplate = props => {
  /*   const barProps = props.data.substances.length <= 1 
    ? props.data.substance
 */

  const data = props.data.map(item => {
    item[props.unit] = item.values;
    return item;
  });
  return (
    <BarChart
      width={600}
      height={400}
      data={props.data}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="year" />
      <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
      <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
      <Tooltip content={<CustomTooltip unit={props.unit} />} />
      <Legend />
      {/* ADD ABILITY TO ADD MULTIPLE BARS BASED ON PROPS SETTINGS */}
      <Bar yAxisId="left" dataKey={props.unit} label fill="#8884d8" />
    </BarChart>
  );
};

export default BarTemplate;
