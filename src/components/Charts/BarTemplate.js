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
  return (
    <BarChart
      width={500}
      height={400}
      data={props.data}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray='3 3' />
      <XAxis dataKey='year' />
      <YAxis yAxisId='left' orientation='left' stroke='#8884d8' />
      <YAxis yAxisId='right' orientation='right' stroke='#82ca9d' />
      <Tooltip content={<CustomTooltip unit={props.unit} />} />
      <Legend />
      <Bar yAxisId='left' dataKey='values' fill='#8884d8' />
    </BarChart>
  );
};

export default BarTemplate;
