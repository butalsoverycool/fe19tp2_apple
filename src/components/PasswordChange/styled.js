import styled from 'styled-components';
import { device } from '../device';

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
  flex: 1;
  margin: 0.5rem 0.5rem;
  height: 35rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${props => props.theme.cardColor};
  box-shadow: 0 0 20px #ddd;
  border-radius: 10px;

  @media(max-width: 748px) {
    min-width: 95vw;
    height: 25rem;
  }
`;

export const H2 = styled.h2`
  font-weight: lighter;
`;