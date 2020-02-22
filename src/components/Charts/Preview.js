import React from 'react';

import styled from 'styled-components';

import ChartTemplate from './ChartTemplate';
import BarTemplate from './BarTemplate';


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

const Title = styled.h2`
  margin-bottom: 0;
`;

const Subtitle = styled.h3`
  margin-top: 0;
`;

const ChartHeader = styled.h3`
  text-align: center;
`;

const Preview = props => {
  if (!props.data) return '';

  // display data within limited year range
  const data = props.data.slice(
    props.limit.from,
    props.limit.to + 1 || props.data.length - 1
  );

  const range1 = data.length === 1 ? true : false;

  // if range is only 1 year, get 2 value points
  if (range1) {
    data.push(data[0]);
  }

  const { substance, sector } = props.data[0];

  const { year: firstYear } = data[0];

  // year range or single year
  const yearRange =
    firstYear + (range1 ? '' : ' - ' + data[data.length - 1].year);


  // unit is substance.code
  const unit = substance.code;


  return (
    <Wrapper className="preview">
      <Title>{`Emission of ${substance.name}`}</Title>

      <Subtitle>{sector.name}</Subtitle>

      <ChartHeader>{yearRange}</ChartHeader>

      {props.data ? <BarTemplate data={data} unit={unit} /> : null}

      {props.data ? <ChartTemplate data={data} unit={unit} /> : null}
    </Wrapper>
  );
};

export default Preview;
