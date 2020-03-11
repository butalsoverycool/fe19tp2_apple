import React from 'react';
import styled from 'styled-components';

import {
  CartesianGrid,
  XAxis,
  YAxis,
  AreaChart,
  Area,
  BarChart,
  Bar,
  Cell,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const labelSize = dataLen => {
  switch (true) {
    case dataLen > 25:
      return '.5rem';
    case dataLen > 20:
      return '.6rem';
    case dataLen > 15:
      return '.7rem';
    case dataLen > 10:
      return '.9rem';
    default:
      return '1rem';
  }
};

const Container = styled(ResponsiveContainer)`
  margin: auto;
  flex: 1;
`;

export const AreaTemplate = ({ data, theme }) => {
  return (
    <Container width={'99%'} height={'99%'}>
      <AreaChart data={data}>
        <CartesianGrid />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#333"
          fill={theme.color.hex || 'yellow'}
          strokeWidth={1}
        />
        <XAxis dataKey="year" strokeWidth={2} />
        <YAxis
          tickMargin={10}
          strokeWidth={2}
          domain={['auto', 'auto']}
          dataKey="value"
        />
        <Tooltip />
      </AreaChart>
    </Container>
  );
};

export const BarTemplate = props => {
  const { data, theme } = props;

  return (
    <Container width={'95%'} height={'95%'}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis dataKey="value" />
        <Tooltip />
        <Bar dataKey="value">
          {data.map((entry, nth) => (
            <Cell key={`cell-${nth}`} fill={theme.color.hex} />
          ))}
        </Bar>
      </BarChart>
    </Container>
  );
};

export const RadarTemplate = props => {
  const { data, theme } = props;

  return (
    <Container width={'99%'} height={'99%'}>
      <RadarChart cx={'50%'} cy={'50%'} outerRadius={70} data={data}>
        <PolarGrid stroke="#333" />
        <PolarAngleAxis dataKey="year" fontSize={labelSize(data.length)} />
        <PolarRadiusAxis angle={30} domain={[0, 100]} />
        <Radar
          name="Emission"
          dataKey="value"
          stroke="#333"
          fill={theme.color.hex}
          fillOpacity={0.6}
        />
        <Tooltip />
      </RadarChart>
    </Container>
  );
};
