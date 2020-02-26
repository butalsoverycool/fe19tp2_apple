import styled from 'styled-components';
import { device } from '../device';

export const Grid = styled.div`
@media ${device.mobileS} {
  grid-column-start: 1;
  grid-column-end: 11; 
}
@media ${device.mobileM} {
  grid-column-start: 1;
  grid-column-end: 11; 
}
@media ${device.mobileL} {
  grid-column-start: 1;
  grid-column-end: 11; 
}
@media ${device.tablet} {
  grid-column-start: 2; 
  grid-column-end: 10; 
}
@media ${device.laptop} {
  grid-column-start: 2;
  grid-column-end: 10;
}
@media ${device.laptopL} {
  grid-column-start: 2;
  grid-column-end: 10;
}
@media ${device.desktop} {
  grid-column-start: 2;
  grid-column-end: 10;
}
`;

export const Wrapper = styled.div`
  margin: auto;
  width: 100vw;
  max-width: 600px;
  background-color: ${props => props.themeBg || 'none'};
`;