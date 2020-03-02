import styled from 'styled-components';

import { containerAnim, loaderDots, flyCycle, flyRightOne } from './keyframes';

export const Container = styled.div`
  z-index: 2;
  position: fixed;
  left: 50%;
  top: 50%;
  width: 10rem;
  margin-left: -80px;
  margin-top: -40px;
  padding: 0 0 5rem 0;
  overflow-x: hidden;
  display: ${props => (props.name ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-blend-mode: soft-light;
  background-size: cover;
  background-position: center center;

  & *,
  & *::before,
  & *::after {
    box-sizing: border-box;
  }

  animation: ${props => (props.name ? containerAnim(props) : 'none')};
`;

export const TxtContainer = styled.div`
  position: relative;
  margin: 0;
  padding: 0 1rem;
  text-align: center;
  background: #fff;
  box-shadow: 0 0 10px #ddd;
  border-radius: 5px;
`;

export const Txt = styled.p`
  max-width: 8rem;

  &::after {
    font-size: 2rem;
    line-height: 1rem;
    content: ${props => (props.loader ? "'.'" : '')};
    animation: ${props => (props.loader ? loaderDots() : 'none')};
  }
`;

export const BoxContainer = styled.div`
  position: relative;
`;

export const BirdBox = styled.div`
  position: absolute;
  top: -2rem;
  left: -7rem;
  transform: scale(0) translateX(0vw);
  will-change: transform;

  animation: ${flyRightOne} linear infinite;

  animation-duration: ${props => props.duration || '7s'};
  animation-delay: ${props => props.delay || '0s'};
`;

export const Bird = styled.div`
  margin: 0;
  flex-grow: 1;
  background-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/174479/bird-cells-new.svg);
  background-size: auto 100%;
  width: 88px;
  height: 125px;
  will-change: background-position;

  animation: ${flyCycle};
  animation-timing-function: steps(10);
  animation-iteration-count: infinite;
  animation-delay: 0s;
  animation-duration: ${props => props.duration || '0.4s'};
`;
