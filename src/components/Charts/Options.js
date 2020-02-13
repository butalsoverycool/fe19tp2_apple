// all substances
import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import * as Styled from "./Styled";
import { Container, Row, Col } from "react-awesome-styled-grid";
import QueryParams from "./queryParams";
import Timespan from "./Timespan";
import Table from "./Table";

const FlexTable = styled.div`
  width: 90vw;
  max-width: 600px;
  margin: auto;
  display: flex;
  justify-content: space-between;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const Thead = styled.button`
  background-color: lightgrey;
  height: 2rem;
  border-radius: 5px;
  text-align: center;
  width: 8rem;
  padding: 0;
  font-size: 1rem;
  border: none;
  cursor: pointer;
`;

const TD = styled.p`
  color: black;
  padding: 0rem 1rem 0rem 1rem;
  text-decoration: none;
  display: block;

  &.active {
    background-color: lightgrey;
    curspor: ...;
  }
`;

const List = styled.div`
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  height: 30rem;
  overflow: scroll;
`;

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 100px;

  &:hover ${List} {
    display: block;
  }
`;

// STEPS
// blank paper
// choose options:
// chart type
// substance(s)
// sector(s)
// timespan

// COMPONENTS
// Chart instance
// Preview

// Options
// Emission
//

// Table of emission
class Options extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    const config = this.props.config;
    const data = this.props.data;
    this.setState({ config, data }, () =>
      console.log("STATE in options", this.state)
    );
  }

  componentWillUpdate(prevProps, prevState) {}

  render() {
    /* if (!this.state.substances || !this.state.sectors || !this.state.timespan)
      return ""; */

    const errorMsg = this.state.error
      ? "Something went wrong when fetching data from SCB. Try refreshing the page or come back later."
      : "";

    return (
      <>
        <div className="options">
          <Timespan />
          <Table />

          <button onClick={this.update}>UPDATE</button>
          {/* <Chart data={this.state.chartData} /> */}
        </div>
      </>
    );
  }
}

export default Options;
