import React, { Component } from "react";
import axios from "axios";
import src from "./src";
import Options from "./Options";
import queryParams from "./queryParams";
import Table from './Table';
import ChartTemplate from './ChartTemplate';
import * as Styled from './Styled'




class Chart extends Component {
  constructor(props) {
  }

    render() {
      const totalTimespan = this.state.data ? this.state.data.length - 1 : null;
      //const data = this.state.data ? this.state.data : [];
      //console.log("DATA", data);
      return (
        <Styled.ChartWrapper className="Chart">

          <Table />

          <Options
            config={this.state.config}
            updateConfig={this.updateConfig}
            totalTimespan={totalTimespan}
            data={this.state.data}
          />
          
        </Styled.ChartWrapper>
      );
    }
  }
}

export default Chart;
