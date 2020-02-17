import React from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";


const ChartTemplate = props => {
  return (
    <LineChart
      width={600}
      height={400}
      data={props.data}
      margin={{ top: 5, right: 20, bottom: 5, left: 5 }}
    >
      <Line type="monotone" dataKey="values" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="year" />
      <YAxis tickMargin={10} domain={['auto', 'auto']} />
      {/* <Tooltip content={<CustomTooltip unit={props.unit} />} /> */}
    </LineChart>
  );
};

export default ChartTemplate;



