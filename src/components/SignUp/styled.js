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
    grid-column-start: 4;
    grid-column-end: 8;
  }
  @media ${device.laptop} {
    grid-column-start: 4;
    grid-column-end: 8;
  }
  @media ${device.laptopL} {
    grid-column-start: 4;
    grid-column-end: 8;
  }
  @media ${device.desktop} {
    grid-column-start: 4;
    grid-column-end: 8;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
