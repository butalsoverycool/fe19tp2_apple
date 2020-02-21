import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Link } from 'react-router-dom';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Session';

import { Theme } from '../GlobalStyles';

const Container = styled.nav`
  /* border-bottom: 1px solid black; */
  box-shadow: 0 4px 4px -4px black;
  z-index: 1;
  margin-bottom: 3rem;
`;

const LI = styled.div`
  display: inline-block;
  padding: 1em;
  position: relative;

  & > a {
    text-decoration: none;
    color: black;
    /* &:hover {
      color: grey;
    } */

  &:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 5px;
    bottom: 3px;
    left: 0;
    background-color: ${props => props.theme.fontColorPrimary};
    visibility: hidden;
    -webkit-transform: scaleX(0);
    transform: scaleX(0);
    -webkit-transition: all 0.3s ease-in-out 0s;
    transition: all 0.3s ease-in-out 0s;
  }

  &:hover:before {
    visibility: visible;
    -webkit-transform: scaleX(1);
    transform: scaleX(1);
  }
}


`;

const Navigation = ({ authUser }) => (
  <div>
    {' '}
    <AuthUserContext.Consumer>
      {authUser => (authUser ? <NavigationAuth /> : <NavigationNonAuth />)}
    </AuthUserContext.Consumer>
  </div>
);

const NavigationAuth = () => (
  <ThemeProvider theme={Theme}>
    <Container>

      <LI>
        <Link to={ROUTES.SIGN_IN}>Sign In</Link>
      </LI>
      <LI>
        <Link to={ROUTES.LANDING}>Landing</Link>
      </LI>
      <LI>
        <Link to={ROUTES.HOME}>Home</Link>
      </LI>
      <LI>
        <Link to={ROUTES.ACCOUNT}>Account</Link>
      </LI>
      <LI>
        <Link to={ROUTES.ADMIN}>Admin</Link>
      </LI>
      <LI>
        <SignOutButton />
      </LI>

    </Container>
  </ThemeProvider>
);

const NavigationNonAuth = () => (
  <ul>
    <li>
      <Link to={ROUTES.LANDING}>Landing</Link>
    </li>
    <li>
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </li>
  </ul>
);
export default Navigation;
