import React from "react";
import ChartTemplate from "./ChartTemplate";
import styled from "styled-components";

const Wrapper = styled.div`
  margin: auto;
  width: 90vw;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 30px auto;
  background: ${props => props.bg || "none"};
  color: ${props => props.color || "black"};
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
  if (!props.data) return "";

  // slice data-arr based on limit in chart state
  const data = props.data.slice(
    props.limit.from,
    props.limit.to + 1 || props.data.length - 1
  );

  const title = `Emission of ${data[0].substance.name}`;

  const subtitle = data[0].sector.name;

  const chartHeader = `${data[0].year} - ${data[data.length - 1].year}`;

  const unit = data[0].substance.code;

  return (
    <Wrapper className="preview">
      <Title>{title}</Title>

      <Subtitle>{subtitle}</Subtitle>

      <ChartHeader>{chartHeader}</ChartHeader>

      <ChartTemplate data={data} unit={unit} />
    </Wrapper>
  );
};

export default Preview;
