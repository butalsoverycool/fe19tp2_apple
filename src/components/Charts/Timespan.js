// all substances
import React, { Component } from 'react';
import * as Styled from './Styled';

// Table of emission
class Timespan extends Component {
  /* constructor(props) {
    super(props);

    this.pushLimit = this.pushLimit.bind(this);
    this.lastLimit = this.lastLimit.bind(this);
  } */

  /* componentDidMount() {
    if (!this.state.config) {
      const config = this.props.config;
      const data = this.props.data;
      this.setState({ config, data }, () =>
        console.log("STATE in options", this.state)
      );
    }
  } */

  // THESE FUNCS NEED WORK...

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
    if (!this.props.data) return '';
    return (
      <>
        <div className="options">
          <Styled.Wrapper>
            <Styled.CustomizeBox justifyContent="space-between">
              <div>
                <p>FROM</p>
                <Styled.CustomizeBtn
                  onClick={() => this.props.pushRangeLimit('from', 'dec')}
                  margin="0"
                >
                  -
                </Styled.CustomizeBtn>
                <Styled.CustomizeBtn
                  onClick={() => this.props.pushRangeLimit('from', 'inc')}
                  margin="0"
                >
                  +
                </Styled.CustomizeBtn>
              </div>

              <Styled.InnerTable>
                <Styled.CustomizeBtn
                  onClick={() => this.props.setRangeLimit(1)}
                  w="80px"
                >
                  1 year
                </Styled.CustomizeBtn>
                <Styled.CustomizeBtn
                  onClick={() => this.props.setRangeLimit(5)}
                  w="80px"
                >
                  5 years
                </Styled.CustomizeBtn>
                <Styled.CustomizeBtn
                  onClick={() => this.props.setRangeLimit(10)}
                  w="80px"
                >
                  10 years
                </Styled.CustomizeBtn>
                <Styled.CustomizeBtn
                  onClick={() => this.props.setRangeLimit()}
                  w="80px"
                >
                  max
                </Styled.CustomizeBtn>
              </Styled.InnerTable>

              <div>
                <p>TO</p>
                <Styled.CustomizeBtn
                  onClick={() => this.props.pushRangeLimit('to', 'dec')}
                  margin="0"
                >
                  -
                </Styled.CustomizeBtn>
                <Styled.CustomizeBtn
                  onClick={() => this.props.pushRangeLimit('to', 'inc')}
                  margin="0"
                >
                  +
                </Styled.CustomizeBtn>
              </div>
            </Styled.CustomizeBox>
          </Styled.Wrapper>
          <button onClick={this.update}>UPDATE</button>
        </div>
      </>
    );
  }
}

export default Timespan;
