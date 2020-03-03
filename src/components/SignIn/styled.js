import styled from 'styled-components';
import { device } from '../device';

export const Grid = styled.div`
  @media ${device.mobileS} {
    grid-column-start: 1;
    grid-column-end: -1;
    grid-row-start: 2;
    grid-row-end: 8;
  }
  @media ${device.mobileM} {
    grid-column-start: 1;
    grid-column-end: -1;
    grid-row-start: 2;
    grid-row-end: 8;
  }
  @media ${device.mobileL} {
    grid-column-start: 1;
    grid-column-end: -1;
    grid-row-start: 2;
    grid-row-end: 8;
  }
  @media ${device.tablet} {
    grid-column-start: 1;
    grid-column-end: -1;
    grid-row-start: 2;
    grid-row-end: 8;
  }
  @media ${device.laptop} {
    grid-column-start: 1;
    grid-column-end: -1;
    grid-row-start: 2;
    grid-row-end: 8;
  }
  @media ${device.laptopL} {
    grid-column-start: 1;
    grid-column-end: -1;
    grid-row-start: 3;
    grid-row-end: 8;
  }
  @media ${device.desktop} {
    grid-column-start: 1;
    grid-column-end: -1;
    grid-row-start: 3;
    grid-row-end: 8;
  }
`;

export const Header = styled.h1`
  font-weight: lighter;
`;

export const formWrapper = styled.form`
  background: green;
`;

export const Form = styled.input`
  padding: 9px;
  font-size: 14px;
  border: none;
  margin-top: 1em;
  background: #eaeaea;
`;

export const Submit = styled.button`
  background: #e8f0fe;
  border: none;
  font-size: 12px;
`;

export const textWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 290px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background: ${props => props.theme.cardColor};
  box-shadow: 0 0 20px #ddd;
  border-radius: 10px;
`;
