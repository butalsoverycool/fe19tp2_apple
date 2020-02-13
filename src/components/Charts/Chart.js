import React, { Component } from "react";
import axios from "axios";
import src from "./src";
import Options from "./Options";
import Preview from "./Preview";
import queryParams from "./queryParams";

// get query based on args
const queryBakery = ({ substances, sectors }) => {
  // defaults
  substances = substances.lengt > 1 ? substances : ["BC"];
  sectors = sectors.lengt > 1 ? sectors : ["0.5"];

  return {
    query: [
      {
        code: "Luftfororening",
        selection: {
          filter: "item",
          values: substances
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
};

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      config: {
        substances: [],
        sectors: [],
        limit: { from: 0, to: 0 },
        layout: {}
      },
      data: null,
      error: null
    };
  }

  // load config on start
  componentDidMount() {
    this.loadConfig();
  }

  loadConfig() {
    // get config from database //*neess work
    const exampleConfig = {
      substances: ["BC"],
      sectors: ["0.5"],
      limit: { from: 0, to: 27 },
      layout: {}
    }; // **temp
    const config = exampleConfig;

    // update state, then load the data
    this.setState(
      {
        config
      },
      () => {
        this.updateData();
      }
    );
  }

  updateConfig(key, val) {
    // get prev config
    const config = this.state.config;

    // update with new config
    config[key] = val;

    // update state, then load the data
    this.setState(
      {
        config
      },
      () => {
        this.updateData();
      }
    );
  }

  // load the data based on config
  updateData() {
    // bake query
    const query = queryBakery(this.state.config);

    // fetch data
    axios
      .post(src.proxy + src.emissionTable, query)
      .then(res => {
        console.log("POST Success (chartData)");

        const data = res.data.data.map(item => {
          const year = item.key[2];

          const sector = queryParams.sectors.filter(
            sector => sector.code === item.key[1]
          )[0];

          const substance = queryParams.substances.filter(
            substance => substance.code === item.key[0]
          )[0];

          const val = item.values[0];

          return {
            year,
            sector,
            substance,
            val
          };
        });

        // update state
        this.setState({
          data
        });
      })
      // handle error
      .catch(error => {
        console.log("POST Fail (chartData)", error);

        if (this.state.error === null) {
          this.setState({
            error
          });
        }
      });
  }

  render() {
    return (
      <div className="Chart">
        <Preview data={this.state.data} config={this.state.config} />
        <Options
          config={this.state.config}
          update={newConfig => this.updateConfig(newConfig)}
        />
      </div>
    );
  }
}

export default Chart;
