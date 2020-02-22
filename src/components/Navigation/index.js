import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Session';
import * as ROLES from '../../constants/roles';

const Container = styled.nav`
  border-bottom: 1px solid black;
`;
const UL = styled.ul``;

const LI = styled.li`
  display: inline-block;
  padding: 1em;

  & > a {
    text-decoration: none;
    color: black;

    &:hover {
      color: grey;
    }
  }
`;

const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser =>
      authUser ? <NavigationAuth authUser={authUser} /> : <NavigationNonAuth />
    }
  </AuthUserContext.Consumer>
);
const NavigationAuth = ({ authUser }) => (
  <Container>
    <UL>
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
      </LI>{' '}
      {/* {!!authUser.role[ROLES.ADMIN] && ( */}
      <LI>
        <Link to={ROUTES.ADMIN}>Admin</Link> {/* display only if admin user */}
      </LI>
      {/* )} */}
      <LI>
        <SignOutButton />
      </LI>
    </UL>
  </Container>
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
