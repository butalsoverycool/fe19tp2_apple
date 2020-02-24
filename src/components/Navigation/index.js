import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Link } from 'react-router-dom';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Session';
import * as ROLES from '../../constants/roles';
import * as Styled from './styled';
import { Theme } from '../GlobalStyles';


const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser =>
      authUser ? <NavigationAuth authUser={authUser} /> : <NavigationNonAuth />
    }
  </AuthUserContext.Consumer>
);

const NavigationAuth = () => (
  <Styled.Grid>

    <Styled.Container>
      <Styled.LI>
        <Link to={ROUTES.SIGN_IN}>Sign In</Link>
      </Styled.LI>
      <Styled.LI>
        <Link to={ROUTES.LANDING}>Landing</Link>
      </Styled.LI>
      <Styled.LI>
        <Link to={ROUTES.HOME}>Home</Link>
      </Styled.LI>
      <Styled.LI>
        <Link to={ROUTES.ACCOUNT}>Account</Link>
      </Styled.LI>{' '}
      {/* {!!authUser.role[ROLES.ADMIN] && ( */}
      <Styled.LI>
        <Link to={ROUTES.ADMIN}>Admin</Link> {/* display only if admin user */}
      </Styled.LI>
      {/* )} */}
      <Styled.LI>
        <SignOutButton />
      </Styled.LI>
    </Styled.Container>

  </Styled.Grid>
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
