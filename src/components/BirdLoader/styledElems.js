import styled, { css } from 'styled-components';

import {
  intro,
  outro,
  dots,
  flyCycle,
  flyRightOne,
  flyRightTwo
} from './keyframes';

const introProps = '1.2s normal ease-out 1 forwards';

const outroProps = '.4s 0s normal ease-in 1 forwards';

const containerIntro = props =>
  css`
    ${intro} ${introProps};
  `;

const containerOutro = props =>
  css`
    ${outro} ${outroProps};
  `;

export const Container = styled.div`
  z-index: 2;
  position: fixed;
  width: 180px;
  height: 80px;
  left: 50%;
  top: 50%;
  margin-left: -80px;
  margin-top: -40px;
  padding: 0;
  overflow: hidden;
  display: flex;
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

  animation: ${props => (props.chartsReady ? containerOutro : containerIntro)};
`;

export const Txt = styled.p`
  position: relative;
  z-index: 3;
  height: auto;
  margin: 0;

  &::after {
    font-size: 2rem;
    content: '.';
    animation: ${dots} 1.3s steps(5, end) infinite;
  }
`;

export const BirdBox = styled.div`
  position: absolute;
  top: -15%;
  left: -10%;
  transform: scale(0) translateX(0vw);
  will-change: transform;

  animation: ${flyRightOne} linear infinite;

  animation-duration: 12s;
  animation-delay: ${props => props.order || '0s'};
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
