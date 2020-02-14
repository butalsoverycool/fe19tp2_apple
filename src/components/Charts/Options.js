// all substances
import React, { Component } from "react";
import Preview from "./Preview";


// Table of emission
class Options extends Component {
  constructor(props) {
    super(props);

    this.updateConfig = this.updateConfig.bind(this);
  }


  const totalTimespan = this.state.data ? this.state.data.length : 0;

  return(
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
