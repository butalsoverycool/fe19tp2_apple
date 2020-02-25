import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Theme } from '../GlobalStyles';

const Wrapper = styled.div`
  width: 84%;
  margin: auto;
`;
const Title = styled.h2`
  margin: 1.5rem 0rem 0.6rem 0rem;
  color: ${props => props.theme.fontColorPrimary};
`;
const Subtitle = styled.h3`
  margin: 0rem 0rem 1rem 0rem;
  color: ${props => props.theme.fontColorPrimary};
`;
const Year = styled.h2`
  text-align: center;
  margin: 8px 0px 0px 0px;
  color: ${props => props.theme.fontColorPrimary};
`;

const ChartHeader = props => {
  if (!props.chart) return '';

  const title = `Emission of ${props.chart.substances[0].name}`;

  /* const subtitle = props.sectors.filter(
    sector => sector.code === props.data[0].sector
  )[0].name; */
  const subtitle = props.chart.sectors[0].name;

  /* const chartHeader = `${props.data[0].year} - ${
    props.data[props.data.length - 1].year
  }`; */

  const limit = props.chart.limit;

  const chartHeader = `${limit.from} - ${limit.to}`;

  return (
    <ThemeProvider theme={Theme}>
      <Wrapper>
        <Title>{title}</Title>

        <Subtitle>{subtitle}</Subtitle>

        <Year>{chartHeader}</Year>
      </Wrapper>
    </ThemeProvider>
  );
};

export default ChartHeader;
