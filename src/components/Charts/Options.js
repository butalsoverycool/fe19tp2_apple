// all substances
import React, { Component } from "react";
import Timespan from "./Timespan";
import Table from "./Table";
import Preview from "./Preview";


// Table of emission
class Options extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.updateConfig = this.updateConfig.bind(this);
  }

  componentWillMount() {
    console.log(this.props)
    const config = this.props.config;
    const data = this.props.data;
    this.setState({ config, data }, () =>
      console.log("STATE in options", this.state)
    );
  }

  componentWillUpdate(prevProps) {
    if (prevProps.data !== this.state.data) {
      const data = this.props.data;
      this.setState({ data }, () =>
        console.log("STATE in options", this.state)
      );
    }
  }

  updateConfig(key, val) {
    const config = this.state.config;
    config[key] = val;

    this.setState({
      config
    });
  }

  render() {

    const totalTimespan = this.state.data ? this.state.data.length : 0;

    return (
      <>
        <div className="options">
          <Preview data={this.state.data} limit={this.state.config.limit} />

          {/* <Timespan
            config={this.state.config}
            update={(key, val) => this.updateConfig(key, val)}
            totalTimespan={totalTimespan}
          /> */}

          {/* <Table update={(key, val) => this.updateConfig(key, val)} /> */}

          <button onClick={this.update}>UPDATE</button>
        </div>
      </>
    );
  }
}

export default Options;
