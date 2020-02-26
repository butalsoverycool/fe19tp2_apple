import React, { Component } from 'react';
import BIRDS from './birds';
import styled from 'styled-components';

const Animation = styled.div`
width: 100vw;
height: 100vh;
position: absolute;
z-index: -1000;
`;

class BirdAnimation extends Component {
  constructor() {
    super()
    this.birdAnimation = React.createRef();
  }
  componentDidMount() {
    this.vantaEffect = BIRDS({
      el: this.birdAnimation.current,
      mouseControls: true,
      touchControls: true,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      backgroundColor: 0xd9d9d9,
      color1: 0x200808,
      color2: 0x8181b,
      wingSpan: 40.00,
      speedLimit: 4.00,
      quantity: 3.00
    })
  }

  componentWillUnmount() {
    if (this.vantaEffect) this.vantaEffect.destroy()
  }

  render() {
    return (
      <Animation className='birds' ref={this.birdAnimation} />
    )
  }
}

export default BirdAnimation; 