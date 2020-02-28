import React, { Component } from 'react';
import * as Styled from './styled';

class Landing extends Component {
  render() {
    return (
      <Styled.Grid>
        <Styled.Wrapper>
          <Styled.Intro>Birds Eye View</Styled.Intro>
          <Styled.Info>Lorem Ipsum miljö environment starry sky bon jovi, great information <br /> here and more cool stuff wish greta thunberg saw this</Styled.Info>
        </Styled.Wrapper>
      </Styled.Grid>
    );
  }
}

export default Landing;
