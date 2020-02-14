// all substances
import React, { Component } from "react";
import * as Styled from "./Styled";



// Table of emission
class Timespan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      config: this.props.config || null
    };

    this.pushLimit = this.pushLimit.bind(this);
    this.lastLimit = this.lastLimit.bind(this);
    /* this.addData = this.addData.bind(this);
    this.delData = this.delData.bind(this); */
  }

  componentDidMount() {
    if (!this.state.config) {
      const config = this.props.config;
      const data = this.props.data;
      this.setState({ config, data }, () =>
        console.log("STATE in options", this.state)
      );
    }
  }

  // THESE FUNCS NEED WORK...
  pushLimit(endPoint, reaseType) {
    let config = this.props.config;

    if (reaseType === "dec") {
      config.limit[endPoint]--;
    } else {
      config.limit[endPoint]++;
    }

    this.props.update("limit", {
      from: config.limit.from,
      to: config.limit.to
    });
  }

  lastLimit(limit) {
    const newState = this.state;

    let config = this.props.config;

    config.limit.from = this.props.totalTimespan - 1 - limit;
    config.limit.to = this.props.totalTimespan;

    this.props.update("limit", {
      from: config.limit.from,
      to: config.limit.to
    });
  }

  render() {
    const errorMsg = this.state.error
      ? "Something went wrong when fetching data from SCB. Try refreshing the page or come back later."
      : "";

    return (
      <>
        <div className="options">
          <div className="errorMsg">{errorMsg}</div>

          <Styled.Wrapper>
            <Styled.CustomizeBox justifyContent="space-between">
              <div>
                <p>FROM</p>
                <Styled.CustomizeBtn
                  onClick={() => this.pushLimit("from", "dec")}
                  margin="0"
                >
                  -
                </Styled.CustomizeBtn>
                <Styled.CustomizeBtn
                  onClick={() => this.pushLimit("from", "inc")}
                  margin="0"
                >
                  +
                </Styled.CustomizeBtn>
              </div>

              <Styled.InnerTable>
                <Styled.CustomizeBtn onClick={() => this.lastLimit(1)} w="80px">
                  last 1
                </Styled.CustomizeBtn>
                <Styled.CustomizeBtn onClick={() => this.lastLimit(3)} w="80px">
                  last 3
                </Styled.CustomizeBtn>
                <Styled.CustomizeBtn onClick={() => this.lastLimit(5)} w="80px">
                  last 5
                </Styled.CustomizeBtn>
                <Styled.CustomizeBtn
                  onClick={() => this.lastLimit(this.props.totalTimespan - 1)}
                  w="80px"
                >
                  max
                </Styled.CustomizeBtn>
              </Styled.InnerTable>

              <div>
                <p>TO</p>
                <Styled.CustomizeBtn
                  onClick={() => this.pushLimit("to", "dec")}
                  margin="0"
                >
                  -
                </Styled.CustomizeBtn>
                <Styled.CustomizeBtn
                  onClick={() => this.pushLimit("to", "inc")}
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
