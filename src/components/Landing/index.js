import React, { Component } from 'react';
import * as Styled from './styled';

class Landing extends Component {
  render() {
    return (
      <Styled.Grid>
        <Styled.Wrapper>
          <Styled.Intro>Birds Eye View</Styled.Intro>
          <Styled.Info>
            B.E.V is a personal dashboard for your company. <br /> Take your
            environmental impact to the next level.{' '}
          </Styled.Info>
        </Styled.Wrapper>
      </Styled.Grid>
    );
  }
}

export default Landing;
