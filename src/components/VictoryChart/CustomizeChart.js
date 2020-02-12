import React from "react";
import styled from "styled-components";

const CustomizeBox = styled.div`
  display: flex;
  justify-content: ${props => props.justifyContent || "center"};
  text-align: ${props => props.textAlign || "center"};
`;

const InnerTable = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const CustomizeBtn = styled.button`
  box-shadow: 0 0 10px #ddd;
  border-radius: 10px;
  width: ${props => props.w || "50px"};
  height: ${props => props.h || "50px"};
  margin: ${props => props.margin || "5px"};
  outline: none;
`;

const CustomizeChart = props => {
  return (
    <CustomizeBox justifyContent="space-between">
      <div>
        <p>FROM</p>
        <CustomizeBtn onClick={() => props.pushLimit("from", "dec")} margin="0">
          -
        </CustomizeBtn>
        <CustomizeBtn onClick={() => props.pushLimit("from", "inc")} margin="0">
          +
        </CustomizeBtn>
      </div>

      <InnerTable>
        <CustomizeBtn onClick={() => props.setLastLimit(1)} w="80px">
          last 1
        </CustomizeBtn>
        <CustomizeBtn onClick={() => props.setLastLimit(3)} w="80px">
          last 3
        </CustomizeBtn>
        <CustomizeBtn onClick={() => props.setLastLimit(5)} w="80px">
          last 5
        </CustomizeBtn>
        <CustomizeBtn
          onClick={() => props.setLastLimit(props.state.data.length - 1)}
          w="80px"
        >
          max
        </CustomizeBtn>
      </InnerTable>

      <div>
        <p>TO</p>
        <CustomizeBtn onClick={() => props.pushLimit("to", "dec")} margin="0">
          -
        </CustomizeBtn>
        <CustomizeBtn onClick={() => props.pushLimit("to", "inc")} margin="0">
          +
        </CustomizeBtn>
      </div>
    </CustomizeBox>
  );
};

export default CustomizeChart;
