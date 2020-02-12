import React from "react";
import styled from "styled-components";

const Title = styled.h2`
  margin-bottom: 0;
`;

const Subtitle = styled.h3`
  margin-top: 0;
`;

const ChartTitle = styled.h3`
  text-align: center;
`;

const ChartHeader = props => {
  return (
    <div className="ChartTitle">
      <Title>{props.apiData.title}</Title>

      <Subtitle>{props.apiData.subtitle}</Subtitle>

      <ChartTitle>{props.apiData.chartTitle(props.chartState)}</ChartTitle>
    </div>
  );
};

export default ChartHeader;
