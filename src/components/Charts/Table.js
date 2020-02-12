// all substances
import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
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

const List = styled.div``;

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

const Thead = styled.p`
  font-weight: 700;
`;

const TD = styled.p``;

//

// Table of emission
class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      substances: null,
      sectors: null,
      timespan: null,
      error: null,

      choice: {
        substances: [],
        sectors: [],
        timespan: []
      },

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

  addChoice(type, val) {
    const currentVals = this.state[type];

    currentVals.push(val);

    this.setState({
      [type]: currentVals
    });
  }

  deleteChoice(type, val) {
    const currentVals = this.state[type];

    const index = currentVals.indexOf(val);

    currentVals.splice(index, 1, val);

    this.setState({
      [type]: currentVals
    });
  }

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
      <>
        <FlexTable className="emissionTable">
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
        </FlexTable>

        <div className="error">{errMsg}</div>

        {/* <Chart data={this.state.chartData} /> */}
      </>
    );
  }
}

export default Table;
