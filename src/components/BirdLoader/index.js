import React, { Component } from 'react';
import styled from 'styled-components';

import { Container, Txt, BirdBox, Bird } from './styledElems';

export default class BirdLoader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { chartsReady } = this.props;

    return (
      <>
        <Container
          className="birdLoader container doIntro doOutro"
          chartsReady={chartsReady || false}
        >
          <Txt className="txt">Getting your charts</Txt>

          <BirdBox className="bird-container bird-container--one" order="0s">
            <Bird className="bird bird--one" duration="0.5s"></Bird>
          </BirdBox>

          <BirdBox className="bird-container bird-container--two" order="0.5s">
            <Bird className="bird bird--two"></Bird>
          </BirdBox>

          <BirdBox
            className="bird-container bird-container--three"
            order="3.2s"
          >
            <Bird className="bird bird--three" duration="0.5s"></Bird>
          </BirdBox>

          <BirdBox className="bird-container bird-container--four" order="5.3s">
            <Bird className="bird bird--four"></Bird>
          </BirdBox>
        </Container>
      </>
    );
  }
}
