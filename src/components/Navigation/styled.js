import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Grid = styled.div`
  grid-column-start: 1;
  grid-column-end: span 10;
  grid-row-start: 1;
  grid-row-end: 3;
`;

export const Container = styled.nav`
  height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 16px;
  justify-content: space-between;
  width: auto;
`;

export const Button = styled.div`
  float: right;
  padding-right: 1rem;
  text-decoration: none;
`;
export const UL = styled.ul``;

export const LI = styled.div`
  flex: 1;
  & > a {
    padding: 1rem;
    margin-left: 2rem;
    text-decoration: none;
  }
`;
