import React from 'react';
import styled from 'styled-components';

import AreaTemplate from './AreaTemplate';
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

const ChartTemplate = ({ type, data, unit }) => {
  switch (type) {
    case 'area':
      return <AreaTemplate data={data} unit={unit} />;
    case 'bar':
      return <BarTemplate data={data} unit={unit} />;
    default:
      return <BarTemplate data={data} unit={unit} />;
  }
};

const Preview = props => {
  if (!props.chart || !props.chart.data) return '';

  let { data, limit } = props.chart;

  // display data within limited year range
  const dataWithinRange = data.slice(
    limit.from,
    limit.to + 1 || data.length - 1
  );

  //console.log('preview data', data);

  const range1 = dataWithinRange.length === 1 ? true : false;

  // if range is only 1 year, get 2 value points
  if (range1) {
    dataWithinRange.push(dataWithinRange[0]);
  }

  const { substance, sector } = data[0];

  // get first last years when available
  const firstYear = dataWithinRange[0] ? dataWithinRange[0].year : '***';
  const lastYear = dataWithinRange[dataWithinRange.length - 1]
    ? dataWithinRange[dataWithinRange.length - 1].year
    : '***';

  // year range or single year
  const yearRange = firstYear + (range1 ? '' : ' - ' + lastYear);

  // unit is substance.code
  const unit = substance.code;

  console.log('yay going to templ');

  return (
    <Wrapper className="preview">
      <Title>{`Emission of ${substance.name}`}</Title>

      <Subtitle>{sector.name}</Subtitle>

      <ChartHeader>{yearRange}</ChartHeader>

      {dataWithinRange ? (
        <ChartTemplate
          type={props.chartType}
          data={dataWithinRange}
          unit={unit}
        />
      ) : null}
    </Wrapper>
  );
};

export default Preview;
