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
    airpollution: ['NOx'],
    values: ['275578.2'],
    sector: '0.5',
    year: '1990'
  },
  {
    airpollution: ['NOx'],
    values: ['280933.6'],
    sector: '0.5',
    year: '1991'
  },
  {
    airpollution: ['NOx'],
    values: ['269098.7'],
    sector: '0.5',
    year: '1992'
  },
  {
    airpollution: ['NOx'],
    values: ['257762.7'],
    sector: '0.5',
    year: '1993'
  },
  {
    airpollution: ['NOx'],
    values: ['261857.3'],
    sector: '0.5',
    year: '1994'
  },
  {
    airpollution: ['NOx'],
    values: ['250666.2'],
    sector: '0.5',
    year: '1995'
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
          <YAxis yAxisId='left' />
          <YAxis yAxisId='right' orientation='right' />
          <Tooltip />
          <Legend />
          <Line
            yAxisId='left'
            type='monotone'
            dataKey='sector'
            stroke='#8884d8'
            activeDot={{ r: 8 }}
          />
          <Line
            yAxisId='right'
            type='monotone'
            dataKey='values'
            stroke='#82ca9d'
          />
        </LineChart>
      </div>
    );
  }
}
