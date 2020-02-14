import React, { Component } from "react";
import axios from 'axios';

import Table from './Table';
import ChartTemplate from './ChartTemplate';


const proxy = "https://cors-anywhere.herokuapp.com/"
const emissionTable = "http://api.scb.se/OV0104/v1/doris/en/ssd/START/MI/MI0108/TotaltUtslapp"

const queryBakery = {
  query: [
    {
      code: "Luftfororening",
      selection: {
        filter: "item",
        values: ["BC"],
      }
    },
    {
      code: "Sektor",
      selection: {
        filter: "item",
        values: ["0.5"],
      }
    }
  ],
  response: { format: "json" }
}


class Charts extends Component {
  constructor(props) {
    super(props);
    this.state = {

      dataRequest: [],
      substances: [],
      sectors: [],
      years: [],

      substancesAdded: [],
      sectorsAdded: [],
      yearsAdded: []
    }
    this.getEmissionData = this.getEmissionData.bind(this);
    this.postEmissionData = this.postEmissionData.bind(this);
    this.tableHandler = this.tableHandler.bind(this);
    this.setActiveClass = this.setActiveClass.bind(this);
  }

  componentDidMount() {
    this.getEmissionData()
  }

  tableHandler = (item, array) => {
    const oldArray = this.state[array];

    oldArray.includes(item)
      ? this.setState(prevState => {
        const newArr = prevState[array].filter(el => el !== item);
        return {
          [array]: newArr
        };
      })
      : this.setState(state => {
        const newArr = [...state[array], item];
        return {
          [array]: newArr
        };
      });
  };

  setActiveClass = (item, array) => {
    const ifArray = array;
    return ifArray.includes(item) ? "active" : "";
  };

  getEmissionData() {
    axios
      .get(proxy + emissionTable)
      .then(res => {
        console.log("GET Succes (emissionTable)");
        console.log(res)
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

        const years = res.data.variables[3].values;

        const data = res;

        this.setState({
          substances,
          sectors,
          years,
          data
        });
      })
  }


  postEmissionData() {
    const query = queryBakery;
    axios
      .post(proxy + emissionTable, query)
      .then(res => {
        console.log('POST SUCCESS')
        /* const data = res.data.data.map(item => {
          const year = item.key[2];

          const sector = queryParams.sectors.filter(
            sector => sector.code === item.key[1]
          )[0];

          const substance = queryParams.substances.filter(
            substance => substance.code === item.key[0]
          )[0];

          const val = item.values[0]; */
        return {
          res,
        }

        //setstate here
      })
      .catch(error => {
        console.log('POST ERROR', error)
      })

  }

  render() {
    this.postEmissionData();
    return (
      <div>
        <Table
          setActiveClass={this.setActiveClass}
          tableHandler={this.tableHandler}
          category={this.state}
        />
        <ChartTemplate />
      </div>
    );
  }
}

export default Charts;
