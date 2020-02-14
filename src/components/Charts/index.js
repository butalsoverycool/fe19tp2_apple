import React, { Component } from 'react';
import * as Recharts from 'recharts';
const {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} = Recharts;

const exampleData = [
  {
    airpollution: ['benzo(b)', '0.5', null],
    values: ['5004.4'],
    year: '2008'
  },
  {
    airpollution: ['benzo(b)', '0.5', null],
    values: ['3456.1'],
    year: '2009'
  },
  {
    airpollution: ['benzo(b)', '0.5', null],
    values: ['3408.9'],
    year: '2010'
  },
  {
    airpollution: ['benzo(b)', '0.5', null],
    values: ['3346.1'],
    year: '2011'
  },
  {
    airpollution: ['benzo(b)', '0.5', null],
    values: ['3151.2'],
    year: '2012'
  },
  {
    airpollution: ['benzo(b)', '0.5', null],
    values: ['3044.3'],
    year: '2013'
  },
  {
    airpollution: ['benzo(b)', '0.5', null],
    values: ['2827.0'],
    year: '2014'
  },
  {
    airpollution: ['benzo(b)', '0.5', null],
    values: ['2763.5'],
    year: '2015'
  },
  {
    airpollution: ['benzo(b)', '0.5', null],
    values: ['2734.2'],
    year: '2016'
  }
];

export default class Chart extends Component {
  render() {
    return (
      <div>
        <LineChart
          width={500}
          height={300}
          data={exampleData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='year' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type='monotone'
            dataKey='airpollution'
            stroke='#8884d8'
            strokeDasharray='5 5'
          />
          <Line
            type='monotone'
            dataKey='values'
            stroke='#82ca9d'
            strokeDasharray='3 4 5 2'
          />
        </LineChart>
      </div>
    );
  }
}
