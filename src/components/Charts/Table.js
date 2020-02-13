// all substances
import React, { Component } from "react";
import axios from "axios";
import styled, { ThemeConsumer } from "styled-components";
import { Container, Row, Col } from "react-awesome-styled-grid";
import Chart from "./Chart";

// URLS to work with
const url = {
  proxy: "https://cors-anywhere.herokuapp.com/",
  emissionTable:
    "http://api.scb.se/OV0104/v1/doris/en/ssd/START/MI/MI0108/TotaltUtslapp"
};

// get query based on args
const queryBakery = ({ substances, sector, timespan }) => {
  return {
    query: [
      {
        code: "Luftfororening",
        selection: {
          filter: "item",
          values: substances.code
        }
      },
      {
        code: "Sektor",
        selection: {
          filter: "item",
          values: sector.code
        }
      },
      {
        code: "Tid",
        selection: {
          filter: "item",
          values: timespan
        }
      }
    ],
    response: {
      format: "json"
    }
  };
};

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

/* class Column extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayList: false
    };
  }

  render() {
    return (
      <>
        <List></List>
      </>
    );
  }
} */

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

// Table of emission
class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      substances: null,
      sectors: null,
      timespan: null,
      error: null,

      isOptionActive: [], //test state

      sectorAdded: [],
      substancesAdded: [],
      timespanAdded: [],

      chartData: null
    };
  }

  componentDidMount() {
    this.getEmissionTable();
  }

  getEmissionTable() {
    axios
      .get(url.proxy + url.emissionTable)
      .then(res => {
        console.log("GET Succes (emissionTable)");

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

        const timespan = res.data.variables[3].values;

        // update state
        this.setState({
          substances,
          sectors,
          timespan
        });
      })
      // handle get-error
      .catch(error => {
        console.log("GET Fail (emissionTable)", error);

        if (this.state.error === null) {
          this.setState({
            error
          });
        }
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

  getEmissionData(choice) {
    if (
      this.state.choice.substances.length < 1 ||
      this.state.choice.sectors.length < 1 ||
      this.state.choice.timespan.length < 1
    ) {
      const errorMsg = "You have to choose substance, sector and timespan";

      this.setState({
        error: errorMsg
      });

      return;
    }

    const query = queryBakery(choice);

    axios
      .post(url.proxy + url.emissionTable, query)
      .then(res => {
        console.log("POST Success (chartData)", res);

        const chartData = res.data.data; // format later

        this.setState({
          chartData
        });
      })
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
    if (!this.state.substances || !this.state.sectors || !this.state.timespan)
      return "";

    const errMsg = this.state.error
      ? "Something went wrong when fetching data from SCB. Try refreshing the page or come back later."
      : "";

    console.log("Emission Table", this.state);

    return (
      //Dropdown menus, one for substance and one for sector (year will generated )
      <>
        <Container>
          <Row>
            <Col xs={2} sm={2} md={1} lg={4} xl={4}>
              <DropdownContainer className="dropdown-container">
                <Thead className="dropdown-button">Substance</Thead>
                <List className="dropdown-content">
                  {this.state.substances.map((item, index) => (
                    <TD
                      key={item.code}
                      onClick={() => this.tableHandler(item, "substancesAdded")}
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
                  {this.state.sectors.map((item, index) => (
                    <TD
                      key={item.code}
                      onClick={() => this.tableHandler(item, "sectorAdded")}
                      className={this.setActiveClass(
                        item,
                        this.state.sectorAdded
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
                <Thead className="dropdown-button">Timespan</Thead>
                <List className="dropdown-content">
                  {this.state.timespan.map((item, index) => (
                    <TD
                      key={item}
                      onClick={() => this.tableHandler(item, "timespanAdded")}
                      className={this.setActiveClass(
                        item,
                        this.state.timespanAdded
                      )}
                    >
                      {item}
                    </TD>
                  ))}
                </List>
              </DropdownContainer>
            </Col>
          </Row>
        </Container>

        <div className="error">{errMsg}</div>

        {/* <Chart data={this.state.chartData} /> */}
      </>
    );
  }
}

export default Table;
