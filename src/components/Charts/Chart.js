import React, { Component } from "react";
import axios from "axios";
import ChartTemplate from "./ChartTemplate";
import * as Styled from "./Styled";
import Table from "./Table";

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      display: null,
      limit: { from: 0, to: 0 },
      error: null
    };
  }

  apiData = (() => this.props.apiData)();

  getMatches() {
    const proxy = "https://cors-anywhere.herokuapp.com/";
    const url = proxy + this.props.apiData.url;

    axios
      .post(url, this.props.apiData.query, {
        headers: { Authorization: "Access-Control-Allow-Origin" }
      })
      .then(res => {
        console.log("POST Success", res);

        const data = this.props.apiData.callback(res);

        console.log("DATA processed", data);

        this.setState({
          data,
          limit: {
            from: 0,
            to: data.length - 1
          }
        });
      })
      .catch(error => {
        console.log("GET Fail", error);

        if (this.state.error === null) {
          this.setState({
            error
          });
        }
      });
  }

  componentDidMount() {
    this.getMatches();
  }

  pushLimit(endPoint, reaseType) {
    let newLimit;

    if (reaseType === "dec") {
      newLimit = this.state.limit[endPoint] - 1;
    } else {
      newLimit = this.state.limit[endPoint] + 1;
    }

    if (newLimit < 0 || newLimit > this.state.data.length - 1) {
      console.log("Range limit reached");
      return;
    }

    this.setState({
      limit: {
        ...this.state.limit,
        [endPoint]: newLimit
      }
    });
  }

  lastLimit(limit) {
    const from = this.state.data.length - 1 - limit;
    const to = this.state.data.length - 1;

    this.setState({
      limit: {
        from,
        to
      }
    });
  }

  render() {
    const { data, limit, error } = this.state || null;

    if (!data) return "";

    const formatLimit = this.state.limit || data.length || null;

    const displayData = data.slice(limit.from, limit.to + 1) || data;

    return (
      <div>
        <Styled.Wrapper>
          <Styled.Title>{this.props.apiData.title}</Styled.Title>

          <Styled.Subtitle>{this.props.apiData.subtitle}</Styled.Subtitle>

          <Styled.ChartHeader>
            {this.props.apiData.chartHeader(this.state)}
          </Styled.ChartHeader>

          <ChartTemplate data={displayData} unit={this.props.apiData.unit} />

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
                onClick={() => this.lastLimit(this.state.data.length - 1)}
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
          <p className="error">{error}</p>
        </Styled.Wrapper>

        <Table />
      </div>
    );
  }
}

export default Chart;
