// all substances
import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import * as Styled from "./Styled";
import { Container, Row, Col } from "react-awesome-styled-grid";
import QueryParams from "./queryParams";
import Table from "./Table";

const FlexTable = styled.div`
  width: 90vw;
  max-width: 600px;
  margin: auto;
  display: flex;
  justify-content: space-between;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const Thead = styled.button`
  background-color: lightgrey;
  height: 2rem;
  border-radius: 5px;
  text-align: center;
  width: 8rem;
  padding: 0;
  font-size: 1rem;
  border: none;
  cursor: pointer;
`;

const TD = styled.p`
  color: black;
  padding: 0rem 1rem 0rem 1rem;
  text-decoration: none;
  display: block;

  &.active {
    background-color: lightgrey;
    curspor: ...;
  }
`;

const List = styled.div`
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  height: 30rem;
  overflow: scroll;
`;

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 100px;

  &:hover ${List} {
    display: block;
  }
`;

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
