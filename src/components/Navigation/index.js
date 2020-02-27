import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Link } from 'react-router-dom';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import * as Styled from './styled';
import { AuthUserContext } from '../Session';
import { Theme } from '../GlobalStyles';
import { withTheme } from '../Theme';

const Logo = styled.img`
  width: 50px;
  position: absolute;
  border-radius: 50%;
  margin: 0.5rem 0 0 1rem;
`;

const Navigation = props => (
  <AuthUserContext.Consumer>
    {authUser =>
      authUser ? (
        <NavigationAuth authUser={authUser} theme={props.theme} />
      ) : (
        <NavigationNonAuth theme={props.theme} />
      )
    }
  </AuthUserContext.Consumer>
);

const NavigationAuth = props => (
  <Styled.Nav>
    <Styled.Container>
      <Link to={ROUTES.DASHBOARD}>
        <Logo
          src={props.theme.state.logoUrl || props.theme.state.defaultLogoUrl}
          alt='BEV logo'
        />
      </Link>{' '}
      <Styled.NavLi>
        <SignOutButton />
      </Styled.NavLi>{' '}
      <Styled.NavLi>
        <Link to={ROUTES.ACCOUNT}>Account</Link>
      </Styled.NavLi>
      <Styled.NavLi>
        <Link to={ROUTES.DASHBOARD}>Dashboard</Link>
      </Styled.NavLi>
    </Styled.Container>
  </Styled.Nav>
);

const NavigationNonAuth = props => (
  <header>
    <Link to={ROUTES.LANDING}>
      <Logo
        src={props.theme.state.logoUrl || props.theme.state.defaultLogoUrl}
        alt='BEV logo'
      />
    </Link>

    <Styled.LI>
      <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </Styled.LI>
    <Styled.LI>
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </Styled.LI>
  </header>
);

export default withTheme(Navigation);
