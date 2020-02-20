import React, { Component } from "react";
import styled from 'styled-components';
import axios from "axios";
import src from "./src";
import Options from "./Options";
import queryParams from "./queryParams";
import Table from './Table';
import ChartTemplate from './ChartTemplate';
import * as Styled from './Styled'




const Chart = ({data, children}) => {
      const AddChart = () => {
        return(
          <button className>ADD CHART</button>
        );
      }

      const AddChartStyled = styled(AddChart)`
        width: 100px;
        height: 50px;
        border-radius: 10px;
        border: none;
        box-shadow: 0 0 10px #eee;
        font-size: 1em;
      `;

      const totalTimespan = this.state.data ? this.state.data.length - 1 : null;
      //const data = this.state.data ? this.state.data : [];
      //console.log("DATA", data);
      return (
        <div className="Chart">
          <AddChartStyled/>
          {data ? children : null}
        </div>
      );
  }
}

export default Chart;
