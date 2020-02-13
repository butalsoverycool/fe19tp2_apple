import React, { Component } from "react";
import axios from "axios";
import src from "./src";
import Options from "./Options";
import Preview from "./Preview";
import queryParams from "./queryParams";

//CHART STATE

//PREVIEW
//config
//limit (data)

//OPTIONS
//config
//data

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
        substances: ["BC"],
        sectors: ["0.5"],
        limit: { from: 0, to: null },
        layout: {},
        sectorsAdded: [],
        substancesAdded: [],
        yearsAdded: []
      },
      data: null,
      error: null
    };

    this.updateConfig = this.updateConfig.bind(this);
  }

  // load config on start
  componentWillMount() {
    this.loadConfig();
  }

  loadConfig() {
    // get config from database //*neess work
    const exampleConfig = {
      substances: ["BC"],
      sectors: ["0.5"],
      limit: { from: 0, to: 27 },
      layout: {},
      sectorsAdded: [],
      substancesAdded: [],
      yearsAdded: []
    }; // **temp
    const config = exampleConfig;

    // update state, then load the data
    this.setState(
      {
        config
      },
      () => {
        this.updateData();
        console.log("chart config", this.state.config);
      }
    );
  }

  updateConfig(newConfig) {
    console.log("UPDATE CONF IN CHART!", newConfig);

    if (this.state.config === newConfig) return;

    // update state, then load the data
    this.setState(
      {
        config: newConfig
      },
      () => {
        this.updateData();
        console.log("chart config", this.state.config);
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
    const totalTimespan = this.state.data ? this.state.data.length - 1 : null;
    const data = this.state.data ? this.state.data : [];
    console.log("DATA", data);
    return (
      <div className="Chart">
        <Preview data={this.state.data} limit={this.state.config.limit} />
        <Options
          config={this.state.config}
          updateConfig={this.updateConfig}
          totalTimespan={totalTimespan}
          data={data}
        />
      </div>
    );
  }
}

export default Chart;
