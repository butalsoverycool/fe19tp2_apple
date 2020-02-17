import React, { Component } from "react";
import styled from "styled-components";
import * as V from "victory";

const TooltipStyled = styled.div`
  padding: 5px;
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 10px;
  box-shadow: 0 0 20px grey;
  font-size: 0.8em;
  font-style: italic;
`;

class CustomLabel extends React.Component {
  render() {
    return (
      <g>
        <V.VictoryLabel {...this.props} />
        <V.VictoryTooltip
          {...this.props}
          x={200}
          y={250}
          orientation="top"
          pointerLength={0}
          cornerRadius={50}
          flyoutWidth={100}
          flyoutHeight={100}
          flyoutStyle={{ fill: "black" }}
          labels={d => d.y}
        />
      </g>
    );
  }
}

CustomLabel.defaultEvents = V.VictoryTooltip.defaultEvents;

const ChartType = props => {
  switch (props.type) {
    case "Scatter":
      return (
        <V.VictoryScatter style={props.style || { data: { fill: "black" } }} />
      );
    case "pie":
      return (
        <V.VictoryPie
          style={props.style || { labels: { fill: "white" } }}
          innerRadius={props.innerRadius || 100}
          labelRadius={props.labelRadius || 120}
          labels={props.labels ? props.labels : ({ datum }) => `# ${datum.y}`}
          labelComponent={<CustomLabel />}
          data={props.data}
        />
      );
  }
};

const Template = props => {
  const data = props.data.map(item => {
    let year = Object.keys(item)[0];
    let val = Object.values(item)[0];

    return { name: year, val: val };
  });

  console.log("props data", props.data);
  const data1 = props.data.map(item => {
    return { x: Object.keys(item)[0], y: Number(Object.values(item)[0]) };
  });
  console.log("data1", data1);

  const data2 = data1.map(item => {
    return { x: item.x, y: Number(item.y) + 100000 };
  });

  console.log("data2", data2);

  const data3 = data2.map(item => {
    return { x: item.x, y: Number(item.y) + 100000 };
  });

  const strippedData = [];
  data1.forEach((item, nth) => {
    if (nth % 5 === 0) {
      strippedData.push({ y: item.x, x: item.y, label: item.x });
    }
  });

  return (
    <>
      <ChartType
        type="pie"
        data={strippedData}
        style={{ labels: { fill: "white" } }}
        labels={({ datum }) => datum.y}
      />
      <V.VictoryChart
        scale={{ x: "time" }}
        width={400}
        height={400}
        animate={{ duration: 1000, easing: "expOut" }}
      >
        <V.VictoryStack
          colorScale="warm"
          animate={{
            onEnter: {
              duration: 1000,
              before: () => ({
                _y: 0,
                fill: "yellow",
                label: "HELLO"
              })
            },
            onExit: {
              duration: 1000,
              before: () => ({
                _y: 0,
                fill: "orange",
                label: "BYE"
              })
            }
          }}
        >
          <V.VictoryGroup data={data1}>
            <V.VictoryArea />
            <V.VictoryPortal>
              <V.VictoryScatter style={{ data: { fill: "black" } }} />
            </V.VictoryPortal>
          </V.VictoryGroup>
          <V.VictoryGroup data={data2}>
            <V.VictoryArea />
            <V.VictoryPortal>
              <V.VictoryScatter style={{ data: { fill: "black" } }} />
            </V.VictoryPortal>
          </V.VictoryGroup>
          <V.VictoryGroup data={data3}>
            <V.VictoryArea />
            <V.VictoryPortal>
              <V.VictoryScatter style={{ data: { fill: "black" } }} />
            </V.VictoryPortal>
          </V.VictoryGroup>
        </V.VictoryStack>
      </V.VictoryChart>
    </>
  );
};

export default Template;
