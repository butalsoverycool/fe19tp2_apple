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

  // display value on bars if data-length is less than 7
  const label = data.length < 7 ? true : false;

  return (
    <BarChart
      width={600}
      height={400}
      data={data}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      {
        /* <<<<<<< HEAD
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="year" />
      <YAxis
        yAxisId="left"
        orientation="left"
        stroke="#8884d8"
        dataKey="value"
      />
      <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
      <Tooltip content={<CustomTooltip unit={props.unit} />} />
      <Legend />
      {/* ADD ABILITY TO ADD MULTIPLE BARS BASED ON PROPS SETTINGS */
        <Bar yAxisId="left" dataKey={props.unit} label={label} fill="#8884d8" />
        /* <Bar yAxisId="right" dataKey={props.unit} label fill="#333" /> 
======= */
      }
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="year" />
      <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
      <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
      <Tooltip content={<CustomTooltip unit={props.unit} />} />
      <Legend />
      <Bar yAxisId="left" dataKey="values" fill="#8884d8" />
      {/* >>>>>>> master */}
    </BarChart>
  );
};

export default BarTemplate;
