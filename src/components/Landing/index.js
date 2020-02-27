import React, { Component } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import BIRDS from './birds';

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  z-index: -1000;
`;

const Intro = styled.h1`
  margin-left: 15rem;
  text-align: left;
  line-height: 80vh;
  font-size: 60px;
`;
class Landing extends Component {
  constructor() {
    super();
    this.birdAnimation = React.createRef();
  }
  componentDidMount() {
    this.vantaEffect = BIRDS({
      el: this.birdAnimation.current,
      mouseControls: true,
      touchControls: true,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0,
      backgroundColor: 0xd9d9d9,
      color1: 0x200808,
      color2: 0x8181b,
      wingSpan: 40.0,
      speedLimit: 4.0,
      quantity: 3.0
    });
  }
  componentWillUnmount() {
    if (this.vantaEffect) this.vantaEffect.destroy();
  }
  render() {
    return (
      <Background className='birds' ref={this.birdAnimation}>
        <Intro>Birds Eye View</Intro>
      </Background>
    );
  }
}

export default Landing;
