import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Template from './Template';
import ChartHeader from './ChartHeader';
import CustomizeChart from './CustomizeChart';

const Wrapper = styled.div`
  margin: auto;
  width: 90vw;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 30px auto;
  background: ${props => props.bg || 'none'};
  color: ${props => props.color || 'black'};
`;

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
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const url = proxy + this.props.apiData.url;

    axios
      .post(url, this.props.apiData.query, {
        headers: { Authorization: 'Access-Control-Allow-Origin' }
      })
      .then(res => {
        console.log('POST Success', res);

        const data = this.props.apiData.callback(res);

        console.log('DATA processed', data);

        this.setState({
          data,
          limit: {
            from: 0,
            to: data.length - 1
          }
        });
      })
      .catch(error => {
        console.log('POST Fail', error);

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

    if (reaseType === 'dec') {
      newLimit = this.state.limit[endPoint] - 1;
    } else {
      newLimit = this.state.limit[endPoint] + 1;
    }

    if (newLimit < 0 || newLimit > this.state.data.length - 1) {
      console.log('Range limit reached');
      return;
    }

    this.setState({
      limit: {
        ...this.state.limit,
        [endPoint]: newLimit
      }
    });
  }

  setLastLimit(limit) {
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

    if (!data) return '';

    const formatLimit = this.state.limit || data.length - 1 || null;

    const dataInView = data.slice(limit.from, limit.to + 1) || data;

    return (
      <div>
        <Wrapper>
          <ChartHeader apiData={this.props.apiData} chartState={this.state} />

          <Template data={dataInView} unit={this.props.apiData.unit} />

          <CustomizeChart
            data={this.state.data}
            pushLimit={(endPoint, reaseType) =>
              this.pushLimit(endPoint, reaseType)
            }
            setLastLimit={limit => this.setLastLimit(limit)}
            state={this.state}
          />

          <p className='error'>{error}</p>
        </Wrapper>
      </div>
    );
  }
}

export default Chart;
