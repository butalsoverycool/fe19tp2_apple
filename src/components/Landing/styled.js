import styled from 'styled-components';
import { device } from '../device';

export const Intro = styled.h1`
margin: 0;
@media ${device.mobileS} {
font-size: 2rem;
}
@media ${device.tablet} {
font-size: 2.3rem;
}
@media ${device.laptop} {
font-size: 3rem;
}
`;

export const Info = styled.p`
line-height: 1.5;
margin: 0.8rem 0.2rem;

@media ${device.mobileS} {
font-size: 0.8rem;
}
@media ${device.tablet} {
font-size: 1rem;
}
@media ${device.laptop} {
font-size: 1rem;
}
`;

export const Wrapper = styled.div`
width: 100%;
`;

export const Grid = styled.div`
grid-row-start: 3;

@media ${device.mobileS} {
  grid-column-start: 2;
  grid-column-end: 10;
  grid-row-start: 4;
  grid-row-end: 6;
  
}
@media ${device.mobileM} {
  grid-column-start: 2;
  grid-column-end: 10;
  grid-row-start: 4;
  grid-row-end: 6;
  
}
@media ${device.mobileL} {
  grid-column-start: 2;
  grid-column-end: 10;
  grid-row-start: 4;
  grid-row-end: 6;
  
}
@media ${device.tablet} {
  grid-column-start: 2;
  grid-column-end: 10;
  grid-row-start: 4;
  grid-row-end: 6;
  
}
@media ${device.laptop} {
  grid-column-start: 3;
  grid-column-end: 10;
  grid-row-start: 4;
  grid-row-end: 6;
  
}
@media ${device.laptopL} {
  grid-column-start: 3;
  grid-column-end: 10;
  grid-row-start: 4;
  grid-row-end: 6;
  
}
@media ${device.desktop} {
  grid-column-start: 3;
  grid-column-end: 10;
  grid-row-start: 4;
  grid-row-end: 6;
  
}
`;
