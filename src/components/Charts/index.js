import React, { Component } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import * as Recharts from 'recharts';
const {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} = Recharts;

const ALL_POLLUTION = gql`
  {
    pollution(id: "NOx") {
      id
      year
    }
  }
`;

function Chart() {
  const { loading, error, data } = useQuery(ALL_POLLUTION);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return data.pollution.map(({ id, year }) => (
    <div key={id}>
      <p>
        {id}: {year}
      </p>
      {/* <LineChart
        width={500}
        height={300}
        data={id}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
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
          dataKey={year}
          stroke='#8884d8'
          activeDot={{ r: 8 }}
        />
        <Line
          yAxisId='right'
          type='monotone'
          dataKey='values'
          stroke='#82ca9d'
        />
      </LineChart> */}
    </div>
  ));
}

export default Chart;
