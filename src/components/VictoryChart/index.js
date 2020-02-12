import React from "react";
import Chart from "./Chart";
import * as data from "./data";

var dataArr = [];
for (let item in data) {
  dataArr.push(data[item]);
}

const VictoryChart = props => {
  return (
    <div className="Charts">
      {dataArr.map(item => (
        <Chart key={item.title} apiData={item} />
      ))}
    </div>
  );
};

export default VictoryChart;
