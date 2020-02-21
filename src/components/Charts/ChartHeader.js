import React from 'react';
import styled from 'styled-components';

const Title = styled.h3`
	margin: 0;
	color: dimgray;
`;

const Subtitle = styled.p`
	margin: 0;
	color: dimgray;
`;

const ChartHead = styled.p`
	text-align: center;
	margin: 8px 0px 0px 0px;
	color: dimgray;
`;


const ChartHeader = (props) => {
  if (!props.data) { return ''; };
  const title = `Emission of ${props.data[0].substance}`;

  const subtitle = props.sectors.filter(
    (sector) => sector.code === props.data[0].sector
  )[0].name;

  const chartHeader = `${props.data[0].year} - ${props.data[props.data.length - 1].year}`;


  return (
    <div>
      <Title>{title}</Title>

      <Subtitle>{subtitle}</Subtitle>

      <ChartHead>{chartHeader}</ChartHead>
    </div>
  )
}



export default ChartHeader; 