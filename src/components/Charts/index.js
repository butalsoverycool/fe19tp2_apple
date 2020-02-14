import React, { Component } from "react";
import axios from "axios";

import Table from "./Table";
import ChartTemplate from "./ChartTemplate";

const proxy = "https://cors-anywhere.herokuapp.com/";
const emissionTable =
  "http://api.scb.se/OV0104/v1/doris/en/ssd/START/MI/MI0108/TotaltUtslapp";

const queryBakery = {
  query: [
    {
      code: "Luftfororening",
      selection: {
        filter: "item",
        values: ["BC"]
      }
    },
    {
      code: "Sektor",
      selection: {
        filter: "item",
        values: ["0.5"]
      }
    }
  ],
  response: { format: "json" }
};

const exampleCharts = [
  {
    id: 0,
    config: {
      substancesAdded: [],
      sectorsAdded: [],
      yearsAdded: []
    }
  },
  {
    id: 1,
    config: {
      substancesAdded: [],
      sectorsAdded: [],
      yearsAdded: []
    }
  },
  {
    id: 2,
    config: {
      substancesAdded: [],
      sectorsAdded: [],
      yearsAdded: []
    }
  }
];

class Charts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        response: [],
        substances: [],
        sectors: [],
        years: []
      },
      charts: [
        /* {
          id: null,
          config: {
            substancesAdded: [],
            sectorsAdded: [],
            yearsAdded: []
          }
        } */
      ]
    };

    this.getEmissionData = this.getEmissionData.bind(this);
    this.postEmissionData = this.postEmissionData.bind(this);
    this.tableHandler = this.tableHandler.bind(this);
    this.setActiveClass = this.setActiveClass.bind(this);
    this.getSavedCharts = this.getSavedCharts.bind(this);
    this.createChart = this.createChart.bind(this);
  }

  componentDidMount() {
    this.getEmissionData();

    this.getSavedCharts();
  }

  getSavedCharts() {} // intergrate firestore to load existing charts...

  // new chart instance
  createChart() {
    // obj template
    const newChart = id => ({
      id,
      config: {
        substancesAdded: [],
        sectorsAdded: [],
        yearsAdded: []
      }
    });

    // get curr charts and add new
    const charts = this.state.charts;
    charts.push(newChart(this.state.charts.length)); // temp incr id

    // update state
    this.setState({
      charts
    });
  }

  // handle table config
  tableHandler = (item, colName, chartId) => {
    //get all charts, prev chart, its index and prev column values
    const charts = this.state.charts;
    const chart = charts.filter(chart => chart.id === chartId)[0];
    const chartIndex = charts.indexOf(chart);
    console.log("the chart", chart);
    const prevCol = chart.config[colName];

    // if col contains clicked item, remove, else add
    const newCol = prevCol.includes(item)
      ? prevCol.filter(el => el !== item)
      : [...prevCol, item];

    //update chart arr based on index
    charts[chartIndex].config[colName] = newCol;

    // update chartArr in state
    this.setState({
      charts
    });
  };

  setActiveClass = (item, array) => {
    const ifArray = array;
    return ifArray.includes(item) ? "active" : "";
  };

  // get overview of available data
  getEmissionData() {
    axios.get(proxy + emissionTable).then(res => {
      console.log("GET Succes (emissionTable)");
      console.log(res);
      // format res-data
      // table-cats: substances, sectors, timespan
      const substances = res.data.variables[0].values.map((item, nth) => ({
        name: res.data.variables[0].valueTexts[nth],
        code: item
      }));

      const sectors = res.data.variables[1].values.map((item, nth) => ({
        name: res.data.variables[1].valueTexts[nth],
        code: item
      }));

      const years = res.data.variables[3].values;

      const response = res;

      this.setState({
        data: {
          response,
          substances,
          sectors,
          years
        }
      });
    });
  }

  // get data based on table choices
  postEmissionData() {
    const query = queryBakery;
    axios
      .post(proxy + emissionTable, query)
      .then(res => {
        console.log("POST SUCCESS");
        /* const data = res.data.data.map(item => {
          const year = item.key[2];

          const sector = queryParams.sectors.filter(
            sector => sector.code === item.key[1]
          )[0];

          const substance = queryParams.substances.filter(
            substance => substance.code === item.key[0]
          )[0];

          const val = item.values[0]; */
        return {
          res
        };

        //setstate here
      })
      .catch(error => {
        console.log("POST ERROR", error);
      });
  }

  render() {
    this.postEmissionData();
    return (
      <div className="Charts">
        <button onClick={this.createChart}>+ADD NEW CHART</button>
        {this.state.charts.map((chart, nth) => (
          <div key={chart.id} className="Chart">
            <Table
              id={chart.id}
              setActiveClass={this.setActiveClass}
              tableHandler={this.tableHandler}
              config={chart.config}
              data={this.state.data}
            />

            <ChartTemplate
              id={chart.id}
              totalTimespan={this.state.data.years.length}
              data={this.state.data}
            />
          </div>
        ))}
      </div>
    );
  }
}

export default Charts;
