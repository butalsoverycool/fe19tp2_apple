// all substances
import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import * as Styled from "./Styled";
import { Container, Row, Col } from "react-awesome-styled-grid";
import QueryParams from "./queryParams";
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

    this.pushLimit = this.pushLimit.bind(this);
    this.lastLimit = this.lastLimit.bind(this);
    this.addData = this.addData.bind(this);
    this.delData = this.delData.bind(this);
  }

  componentWillMount() {
    const config = this.props.config;
    this.setState(config, console.log("config in options", this.state.config));

    const data = this.props.data;
    this.setState(data, console.log("data in options", this.state.data));
  }

  componentWillUpdate(prevProps, prevState) {
    console.log("HALLELUJA");
    for (let prop in prevProps.config) {
      if (prevProps.config[prop] !== this.props.config[prop]) {
        const config = this.props.config;
        this.setState(
          config,
          console.log("config in options", this.state.config)
        );
        break;
      }
    }

    for (let prop in prevProps.data) {
      if (prevProps.data[prop] !== this.props.data[prop]) {
        const data = this.props.data;
        this.setState(data, console.log("data in options", this.state.data));
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

    if (
      newState.limit.from < 0 ||
      newState.limit.to > this.props.totalTimespan - 1
    ) {
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

  tableHandler = (item, category) => {
    const arr = this.state[category];

    arr.includes(item)
      ? this.setState(prevState => {
          const newArr = prevState[category].filter(el => el !== item);
          return {
            [category]: newArr
          };
        })
      : this.setState(state => {
          const newArr = [...state[category], item];
          return {
            [category]: newArr
          };
        });
  };

  setActiveClass = (item, thisState) => {
    const arr = thisState;
    return arr.includes(item) ? "active" : "";
  };

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

          <Container>
            <Row>
              <Col xs={2} sm={2} md={1} lg={4} xl={4}>
                <DropdownContainer className="dropdown-container">
                  <Thead className="dropdown-button">Substance</Thead>
                  <List className="dropdown-content">
                    {this.state.substances.map((item, index) => (
                      <TD
                        key={item.code}
                        onClick={() =>
                          this.tableHandler(item, "substancesAdded")
                        }
                        className={this.setActiveClass(
                          item,
                          this.state.substancesAdded
                        )}
                      >
                        {item.name}
                      </TD>
                    ))}
                  </List>
                </DropdownContainer>
              </Col>

              <Col xs={2} sm={2} md={1} lg={4} xl={4}>
                <DropdownContainer>
                  <Thead className="dropdown-button">Sector</Thead>
                  <List className="dropdown-content">
                    {this.props.data.map((item, index) => (
                      <TD
                        key={item.sector.code + "-" + index}
                        onClick={() => this.tableHandler(item, "sectorsAdded")}
                        className={this.setActiveClass(
                          item,
                          this.state.sectorsAdded
                        )}
                      >
                        {item.name}
                      </TD>
                    ))}
                  </List>
                </DropdownContainer>
              </Col>

              {/* <Col xs={2} sm={2} md={1} lg={4} xl={4}>
                <DropdownContainer>
                  <Thead className="dropdown-button">Timespan</Thead>
                  <List className="dropdown-content">
                    {this.state.timespan.map((item, index) => (
                      <TD
                        key={item}
                        onClick={() => this.tableHandler(item, "yearsAdded")}
                        className={this.setActiveClass(
                          item,
                          this.state.yearsAdded
                        )}
                      >
                        {item}
                      </TD>
                    ))}
                  </List>
                </DropdownContainer>
              </Col> */}
            </Row>
          </Container>

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
