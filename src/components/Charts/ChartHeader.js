import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Theme } from '../GlobalStyles';

const Wrapper = styled.div`
  width: 84%;
  margin: auto;
  margin: auto;
`;
const Title = styled.h2`
  margin: 1rem 0 0 1rem;
  font-size: 18px;
  color: ${props => props.theme.fontColorPrimary};
`;
const Subtitle = styled.h3`
  margin: 0 0 1rem 1rem;
  font-size: 14px;
  font-weight: 500;
  color: ${props => props.theme.fontColorPrimary};
`;
const Year = styled.h2`
  text-align: center;
  font-size: 12px;
  padding: -5rem 0 0 0;
  color: ${props => props.theme.fontColorPrimary};
`;

const ChartHeader = props => {
  if (!props.data) {
    return '';
  }

  const title = `Emission of ${props.data[0].substance.name}`;

  const subtitle = props.sectors.filter(
    sector => sector.code === props.data[0].sector
  )[0].name;

  const chartHeader = `${props.data[0].year} - ${
    props.data[props.data.length - 1].year
  }`;

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
