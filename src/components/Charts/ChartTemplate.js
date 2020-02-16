import React from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";


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

/* const TooltipStyled = styled.div`
  padding: 5px;
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 10px;
  box-shadow: 0 0 20px grey;
  font-size: 0.8em;
  font-style: italic;
`;

 const CustomTooltip = ({ active, label, payload, unit }, ...props) => {
  if (!payload) return "";
  if (!payload[0]) return "";

  const { val } = payload[0].payload;

  if (active) {
    return (
      <TooltipStyled className="custom-tooltip" {...props}>
        <p className="time">
          {label}: {val} {unit || ""}
        </p>
      </TooltipStyled>
    );
  }

  return null;
};
*/


