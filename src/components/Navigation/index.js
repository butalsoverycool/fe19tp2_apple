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
import BirdAnimation from '../BirdAnimation';

const Logo = styled.img`
  max-width: 100px;
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
  <>
    <Styled.Grid>
      <Styled.Container>
        <Link to={ROUTES.DASHBOARD}>
          <Logo src={props.theme.state.dataUrl} alt="BEV logo" />
        </Link>
        <Styled.LI>
          <Link to={ROUTES.DASHBOARD}>Dashboard</Link>
        </Styled.LI>
        <Styled.LI>
          <Link to={ROUTES.ACCOUNT}>Account</Link>
        </Styled.LI>
        <SignOutButton />
      </Styled.Container>
    </Styled.Grid>
  </>
);

const NavigationNonAuth = props => (
  <>
    <BirdAnimation />
    <Styled.Grid>
      <Styled.Container>
        <Link to={ROUTES.LANDING}>
          <Logo src={props.theme.state.dataUrl} alt="BEV logo" />
        </Link>
        <Styled.LI>
          <Link to={ROUTES.SIGN_IN}>Sign In</Link>
        </Styled.LI>
      </Styled.Container>
    </Styled.Grid>
  </>
);

export default withTheme(Navigation);
