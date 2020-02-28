import React, { Component } from 'react';
import {
  Container,
  TxtContainer,
  Txt,
  BoxContainer,
  BirdBox,
  Bird
} from './styledElems';

export default class PopupMsg extends Component {
  constructor(props) {
    super(props);

    this.state = {
      forceExit: false
    };
  }

  render() {
    let { txt, enter, exit, enDelay, exDelay, timeout, loader } = this.props;
    let animName =
      (exit && !enter) || this.state.forceExit
        ? 'exit'
        : enter && !exit && !this.state.forceExit
        ? 'enter'
        : null;

    if (timeout && timeout !== 0) {
      setTimeout(() => this.setState({ forceExit: true }), timeout);
    }

    return (
      <>
        <Container
          className="birdLoader container doIntro doOutro"
          name={animName}
          enDelay={enDelay}
          exDelay={exDelay}
        >
          <TxtContainer>
            <Txt className="txt" loader={loader}>
              {txt || 'Loading'}
            </Txt>
          </TxtContainer>

          <BoxContainer>
            <BirdBox className="bird-container bird-container--one" delay="0s">
              <Bird className="bird bird--one" duration="0.5s"></Bird>
            </BirdBox>

            <BirdBox
              className="bird-container bird-container--two"
              delay="1.5s"
            >
              <Bird className="bird bird--two" duration="0.35s"></Bird>
            </BirdBox>

            <BirdBox
              className="bird-container bird-container--three"
              delay="2.2s"
            >
              <Bird className="bird bird--three" duration="0.6s"></Bird>
            </BirdBox>

            <BirdBox
              className="bird-container bird-container--four"
              delay="4.5s"
            >
              <Bird className="bird bird--four" duration="0.35s"></Bird>
            </BirdBox>
          </BoxContainer>
        </Container>
      </>
    );
  }
}
