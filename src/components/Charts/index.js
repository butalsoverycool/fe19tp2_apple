import React, { Component } from "react";
import Chart from "./Chart";

const exampleChart = {
  id: 0,
  config: {
    type: "line",
    substances: ["BC"],
    sectors: ["05"],
    limit: { from: 0, to: 18 },
    layout: {}
  },
  error: null
};

class Charts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      charts: [exampleChart]
    };
  }

  addChart() {
    const charts = this.state.charts;

    const newChart = {
      id: charts.length,
      config: {
        substances: [],
        sectors: [],
        limit: { from: 0, to: 0 },
        layout: {}
      },
      error: null
    };

    charts.push(newChart);

    this.setState({
      charts
    });
  }

  removeChart(id) {
    const charts = this.state.charts;

    const nth = charts.map(chart => chart.id).indexOf(id);

    charts.splice(nth, 1);

    this.setState({
      charts
    });
  }

  render() {
    return (
      <>
        <div className="Charts">
          {this.state.charts.map((chart, i) => (
            <div className="chartContainer" key={i}>
              <Chart id={i} />
              <button onClick={() => this.removeChart(i)}>DELETE CHART</button>
            </div>
          ))}
        </div>
        <button onClick={this.addChart.bind(this)}>NEW CHART</button>
      </>
    );
  }
}

export default Charts;
