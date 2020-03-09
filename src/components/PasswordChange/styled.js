import styled from 'styled-components';
import { device } from '../device';

export const Grid = styled.div`
  @media ${device.mobileS} {
  }
  @media ${device.mobileM} {
  }
  @media ${device.mobileL} {
  }
  @media ${device.tablet} {
  }
  @media ${device.laptop} {
  }
  @media ${device.laptopL} {
  }
  @media ${device.desktop} {
  }

  grid-column-start: 4;
  grid-column-end: 8;
`;

export const Submit = styled.button`
  background: #e8f0fe;
  border: none;
  font-size: 12px;
`;


export const Form = styled.input`
  padding: 9px;
  font-size: 14px;
  border: none;
  margin-top: 1em;
  background: #eaeaea;
`;

export const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 290px;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${props => props.theme.cardColor};
  box-shadow: 0 0 20px #ddd;
  border-radius: 10px;
`;

export const H2 = styled.h2`
  font-weight: lighter;
`;