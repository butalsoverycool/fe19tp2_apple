// all substances
import React, { Component } from 'react';
import { IoMdArrowDropleft, IoMdArrowDropright } from 'react-icons/io';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 85%;
  margin: auto;
  background: ${props => props.bg || 'none'};
  color: ${props => props.color || 'black'};
  text-align: center;
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
  font-size: ${props => props.fontSize || '1.5rem'};
  color: dimgrey;
  border: none;
  text-align: center;
  outline: none;
  border-radius: 50px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  transition: all 0.1s cubic-bezier(0.25, 0.8, 0.25, 1);

  & > svg {
    display: block;
    margin: auto;
  }

  &:hover {
    box-shadow: 0 12px 26px rgba(0, 0, 0, 0.25), 0 8px 8px rgba(0, 0, 0, 0.22);
  }

  &:active {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    background-color: lightgrey;
    & > svg {
      color: purple;
    }
  }
`;

const Option = styled.option``;

const Select = styled.select`
  height: 1.8rem;
  width: 10rem;
  margin: 0 1rem 1rem 0;
  box-shadow: 0 0 20px #ddd;
  outline: none;
  border: none;
`;

// Table of emission
class Timespan extends Component {
  constructor(props) {
    super(props);

    this.pushTimespan = this.pushTimespan.bind(this);
    this.trimTimespanTo = this.trimTimespanTo.bind(this);
  }

  trimTimespanTo(endpoint) {
    let { timespan, dataTitles, tabIndex } = this.props;

    if (endpoint >= 0) {
      timespan = {
        from: timespan.to - endpoint,
        to: timespan.to
      };
    } else {
      timespan = {
        from: dataTitles.years[0],
        to: dataTitles.years[dataTitles.years.length - 1]
      };
    }

    this.props.updateTab('timespan', timespan, tabIndex);
  }

  pushTimespan = (endPoint, reaseType) => {
    let { timespan, dataTitles, tabIndex } = this.props;

    const from = endPoint === 'from' ? true : false;
    const dec = reaseType === 'dec' ? true : false;
    const otherPoint = from ? 'to' : 'from';

    const firstYear = Number(dataTitles.years[0]);
    const lastYear = Number(dataTitles.years[dataTitles.years.length - 1]);

    if (dec) {
      // - from
      if (from) {
        // fromPoint can't go below first year
        if (timespan.from <= firstYear) return;
      }
      // - to
      else {
        // toPoint must be more than fromPoint
        if (timespan.to <= timespan.from) return;
      }
      timespan[endPoint]--;
    } else {
      // + from
      if (from) {
        // fromPoint must be less than toPoint
        if (timespan.from >= timespan.to) return;
      }
      // + to
      else {
        // toPoint can't go over last year
        if (timespan.to >= lastYear) return;
      }

      timespan[endPoint]++;
    }

    this.props.updateTab('timespan', timespan, tabIndex);
  };

  render() {
    const { tabIndex, timespan, dataTitles, updateTab } = this.props;

    return (
      <>
        <Wrapper>
          {/* Timespan dropdowns */}

          {/* <ButtonContainer justifyContent="space-between">
            <Button onClick={() => this.pushTimespan('from', 'dec')} margin="0">
              <IoMdArrowDropleft />
            </Button>
            from
            <Button onClick={() => this.pushTimespan('from', 'inc')} margin="0">
              <IoMdArrowDropright />
            </Button>
          </ButtonContainer>

          <ButtonContainer>
            <Button
              fontSize=".8rem"
              onClick={() => this.trimTimespanTo(0)}
              w="80px"
            >
              last 1
            </Button>
            <Button
              fontSize=".8rem"
              onClick={() => this.trimTimespanTo(4)}
              w="80px"
            >
              5 years
            </Button>
            <Button
              fontSize=".8rem"
              onClick={() => this.trimTimespanTo(9)}
              w="80px"
            >
              10 years
            </Button>
            <Button
              fontSize=".8rem"
              onClick={() => this.trimTimespanTo()}
              w="80px"
            >
              max
            </Button>
          </ButtonContainer>

          <ButtonContainer>
            <Button onClick={() => this.pushTimespan('to', 'dec')} margin="0">
              <IoMdArrowDropleft />
            </Button>
            to
            <Button onClick={() => this.pushTimespan('to', 'inc')} margin="0">
              <IoMdArrowDropright />
            </Button>
          </ButtonContainer> */}
        </Wrapper>
      </>
    );
  }
}

export default Timespan;
