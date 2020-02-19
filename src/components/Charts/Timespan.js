// all substances
import React, { Component } from 'react';
import { IoMdArrowDropleft, IoMdArrowDropright } from 'react-icons/io';
import * as Styled from './Styled';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 500px;
  margin: auto;
  background: ${props => props.bg || 'none'};
  color: ${props => props.color || 'black'};
  text-align: center;
  padding-bottom: 2rem;
`;

const ButtonContainer = styled.div`
display: inline-block;
padding: 0.5rem;
text-align: center;
`;

const Button = styled.button`
text-decoration: none;
height: 56px;
width: 56px;
font-size: 1.5rem;
color: dimgrey;
border: none;
text-align: center;
outline: none;
border-radius: 50px;
box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
transition: all 0.1s cubic-bezier(.25, .8, .25, 1);

&:hover {
box-shadow: 0 12px 26px rgba(0,0,0,0.25), 0 8px 8px rgba(0,0,0,0.22);
}

&:active {
box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
background-color: lightgrey;
& > svg {
  color: purple;
}
}

& > svg {
  display: block; 
  margin: auto;
}
`;

// Table of emission
class Timespan extends Component {
  /*   lastLimit(limit) {
      const newState = this.state;
  
      let config = this.props.config;
  
      config.limit.from = this.props.totalTimespan - 1 - limit;
      config.limit.to = this.props.totalTimespan;
  
      this.props.update("limit", {
        from: config.limit.from,
        to: config.limit.to
      });
    } */

  render() {
    return (
      <>
        <Wrapper>
          <ButtonContainer justifyContent='space-between'>
            <Button
              onClick={() => this.props.pushLimitHandler('from', 'dec')}
              margin='0'
            >
              <IoMdArrowDropleft />
            </Button>
            from
              <Button
              onClick={() => this.props.pushLimitHandler('from', 'inc')}
              margin='0'
            >
              <IoMdArrowDropright />
            </Button>
          </ButtonContainer>

          {/* <Styled.InnerTable>
                <Styled.CustomizeBtn onClick={() => this.lastLimitHandler(1)} w="80px">
                  last 1
                </Styled.CustomizeBtn>
                <Styled.CustomizeBtn onClick={() => this.lastLimitHandler(3)} w="80px">
                  last 3
                </Styled.CustomizeBtn>
                <Styled.CustomizeBtn onClick={() => this.lastLimitHandler(5)} w="80px">
                  last 5
                </Styled.CustomizeBtn>
                <Styled.CustomizeBtn
                  onClick={() => this.lastLimitHandler(this.props.totalTimespan - 1)}
                  w="80px"
                >
                  max
                </Styled.CustomizeBtn>
              </Styled.InnerTable> */}

          <ButtonContainer>
            <Button
              onClick={() => this.props.pushLimitHandler('to', 'dec')}
              margin='0'
            >
              <IoMdArrowDropleft />
            </Button>
            to
              <Button
              onClick={() => this.props.pushLimitHandler('to', 'inc')}
              margin='0'
            >
              <IoMdArrowDropright />
            </Button>
          </ButtonContainer>
        </Wrapper>
      </>
    );
  }
}

export default Timespan;
