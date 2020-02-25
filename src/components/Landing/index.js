import React, { Component } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import BIRDS from './birds';
import * as Styled from './styled';


class Landing extends Component {
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
      <>
        <Styled.Background className='birds' ref={this.birdAnimation}>
        </Styled.Background >
        <Styled.Grid>
          <Styled.Intro>Birds Eye View</Styled.Intro>
        </Styled.Grid>
      </>
    )
  }
}

export default Landing;


