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

const ChartTemplate = ({ type, data, unit, addedSubstances, addedSectors }) => {
  console.log('chart templ added subst', addedSubstances);
  switch (type) {
    case 'area':
      return (
        <AreaTemplate
          data={data}
          unit={unit}
          addedSubstances={addedSubstances}
          addedSectors={addedSectors}
        />
      );
    case 'bar':
      return (
        <BarTemplate
          data={data}
          unit={unit}
          addedSubstances={addedSubstances}
          addedSectors={addedSectors}
        />
      );
    default:
      return '';
  }
};

const Preview = props => {
  if (!props.chart || !props.chart.data) return '';

  let { data, substances, sectors, limit, type } = props.chart;

  console.log('preview added subst', substances);

  /* console.log('preview data:', data);
  return ''; */

  // display data within limited year range
  const dataInRange = data.slice(limit.from, limit.to + 1 || data.length - 1);

  console.log('DATA IN RANGE', dataInRange);

  var flattenedData = [];

  for (var i = 0; i < dataInRange.length; i++) {
    flattenedData = flattenedData.concat(dataInRange[i]);
  }

  console.log('FLATTENED', flattenedData);

  const single = flattenedData.length === 1 ? true : false;

  // if range is only 1 year, get 2 value points
  if (single) {
    flattenedData.push(flattenedData[0]);
  }

  //console.log('data to display!', flattenedData);
  const { substance, sector } = flattenedData[0];

  //console.log('substance', substance, sector);

  // get first last years when available
  const firstYear = flattenedData[0] ? flattenedData[0].year : '***';
  const lastYear = flattenedData[flattenedData.length - 1]
    ? flattenedData[flattenedData.length - 1].year
    : '***';

  // year range or single year
  const yearRange = firstYear + (single ? '' : ' - ' + lastYear);

  // unit is substance.code
  const unit = substance.name;

  console.log('yay going to templ');

  return (
    <Wrapper className="preview">
      <Title>{`Emission of ${substance.name}`}</Title>

      <Subtitle>{sector.name}</Subtitle>

      <ChartHeader>{yearRange}</ChartHeader>

      {flattenedData ? (
        <ChartTemplate
          type={props.chartType}
          data={flattenedData}
          addedSubstances={substances}
          addedSectors={sectors}
          unit={unit}
        />
      ) : null}
    </Wrapper>
  );
};

export default Preview;
