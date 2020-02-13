// all substances
import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import * as Styled from "./Styled";
import QueryParams from "./queryParams";

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

const List = styled.div``;

const Thead = styled.p`
  font-weight: 700;
`;

const TD = styled.p``;

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

    this.pushLimit = this.pushLimit.bind(this);
    this.lastLimit = this.lastLimit.bind(this);
    this.addData = this.addData.bind(this);
    this.delData = this.delData.bind(this);
  }

  componentWillMount() {
    const config = this.props.config;
    this.setState(config, console.log("state in options", this.state));
  }

  componentWillUpdate(prevProps, prevState) {
    for (let prop in prevProps.config) {
      /* console.log(
        "compare, chart:",
        prevProps.config[prop],
        this.props.config[prop]
      ); */
      if (prevProps.config[prop] !== this.props.config[prop]) {
        const config = this.props.config;
        this.setState(config, console.log("state in options", this.state));
        break;
      }
    }
    console.log("state in options", this.state);
  }

  // THESE FUNCS NEED WORK...
  pushLimit(endPoint, reaseType) {
    let newState = this.state;

    if (reaseType === "dec") {
      newState.limit[endPoint]--;
    } else {
      newState.limit[endPoint]++;
    }

    if (newLimit.limit.from < 0 || newLimit > this.state.data.length - 1) {
      console.log("Range limit reached");
      return;
    }

    this.setState(
      {
        newState
      },
      () => {
        this.props.updateConfig(newState);
      }
    );

    /* this.setState({
      limit: {
        ...this.state.limit,
        [endPoint]: newLimit
      }
    }, () => {
      this.props.update()
    }); */
  }

  lastLimit(limit) {
    const newState = this.state;

    newState.limit.from = this.props.totalTimespan - 1 - limit;
    newState.limit.to = this.props.totalTimespan;

    this.setState(
      {
        newState
      },
      () => {
        this.props.updateConfig(newState);
      }
    );
  }

  addData(type, val) {
    const currentVals = this.state[type];

    currentVals.push(val);

    this.setState({
      [type]: currentVals
    });
  }

  delData(type, val) {
    const currentVals = this.state[type];

    const index = currentVals.indexOf(val);

    currentVals.splice(index, 1, val);

    this.setState({
      [type]: currentVals
    });
  }

  render() {
    /* if (!this.state.substances || !this.state.sectors || !this.state.timespan)
      return ""; */

    const errorMsg = this.state.error
      ? "Something went wrong when fetching data from SCB. Try refreshing the page or come back later."
      : "";

    return (
      <>
        <div className="options">
          <div className="errorMsg">{errorMsg}</div>

          <Styled.Wrapper>
            <Styled.CustomizeBox justifyContent="space-between">
              <div>
                <p>FROM</p>
                <Styled.CustomizeBtn
                  onClick={() => this.pushLimit("from", "dec")}
                  margin="0"
                >
                  -
                </Styled.CustomizeBtn>
                <Styled.CustomizeBtn
                  onClick={() => this.pushLimit("from", "inc")}
                  margin="0"
                >
                  +
                </Styled.CustomizeBtn>
              </div>

              <Styled.InnerTable>
                <Styled.CustomizeBtn onClick={() => this.lastLimit(1)} w="80px">
                  last 1
                </Styled.CustomizeBtn>
                <Styled.CustomizeBtn onClick={() => this.lastLimit(3)} w="80px">
                  last 3
                </Styled.CustomizeBtn>
                <Styled.CustomizeBtn onClick={() => this.lastLimit(5)} w="80px">
                  last 5
                </Styled.CustomizeBtn>
                <Styled.CustomizeBtn
                  onClick={() => this.lastLimit(this.props.totalTimespan - 1)}
                  w="80px"
                >
                  max
                </Styled.CustomizeBtn>
              </Styled.InnerTable>

              <div>
                <p>TO</p>
                <Styled.CustomizeBtn
                  onClick={() => this.pushLimit("to", "dec")}
                  margin="0"
                >
                  -
                </Styled.CustomizeBtn>
                <Styled.CustomizeBtn
                  onClick={() => this.pushLimit("to", "inc")}
                  margin="0"
                >
                  +
                </Styled.CustomizeBtn>
              </div>
            </Styled.CustomizeBox>
          </Styled.Wrapper>

          {/* <FlexTable className="emissionTable">
            <Column className="column substance">
              <Thead className="thead substance">Substance</Thead>
              <List className="list substance">
                {this.state.substances.map(item => (
                  <TD key={item.code}>{item.name}</TD>
                ))}
              </List>
            </Column>

            <Column className="column sector">
              <Thead className="thead sector">Sector</Thead>
              <List className="list sector">
                {this.state.sectors.map(item => (
                  <TD key={item.code}>{item.name}</TD>
                ))}
              </List>
            </Column>

            <Column className="column timespan">
              <Thead className="thead timespan">Timespan</Thead>
              <List className="list timespan">
                {this.state.timespan.map(item => (
                  <TD key={item}>{item}</TD>
                ))}
              </List>
            </Column>
          </FlexTable> */}

          <button onClick={this.update}>UPDATE</button>

          {/* <Chart data={this.state.chartData} /> */}
        </div>
      </>
    );
  }
}

export default Options;
