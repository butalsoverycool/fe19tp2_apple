import React from 'react';
import styled from 'styled-components';
import { withFirebase } from '../Firebase';

export const Button = styled.button`
  font-size: 14px;
  background: none;
  padding: 0.3rem;
  border-style: none;
  border-radius: 0.3rem;
  cursor: pointer;
padding-right: 1rem;

  &:hover {
    transform: scale(1.1);
    transition: all 0.5s ease-in-out;
  }
  
}

`;
const SignOutButton = ({ firebase }) => (
  <Button type="button" onClick={firebase.doSignOut}>
    Sign Out
  </Button>
);

export default withFirebase(SignOutButton);
