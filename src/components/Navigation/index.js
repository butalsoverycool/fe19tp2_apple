import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as Styled from './styled';
import { AuthUserContext } from '../Session';
import { withTheme } from '../Theme';
import BirdAnimation from '../BirdAnimation';
import DashLogo from '../images/Asset1.svg';
import AccountLogo from '../images/Asset2.svg';

const Logo = styled.div``;
const Circle = styled.div`
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin: 0 0 0 0.5rem;
  background-position: 50% 50%;
  background-size: cover;
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
          <Circle
            style={{
              backgroundImage: `url(${props.theme.state.dataUrl ||
                props.theme.state.defaultLogoUrl})`
            }}
            alt="BEV logo"
          >
            <Logo />
          </Circle>
        </Link>
        <Styled.LI>
          <Link to={ROUTES.DASHBOARD}>
            <img className="SVG" src={DashLogo}></img>
          </Link>

          <Link to={ROUTES.ACCOUNT}>
            <img className="SVG" src={AccountLogo}></img>
          </Link>
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
          <Circle
            style={{
              backgroundImage: `url(${props.theme.state.dataUrl ||
                props.theme.state.defaultLogoUrl})`
            }}
            alt="BEV logo"
          >
            <Logo />
          </Circle>
        </Link>
        <Styled.Button>
          <Link to={ROUTES.SIGN_IN}>Sign In</Link>
        </Styled.Button>
      </Styled.Container>
    </Styled.Grid>
  </>
);

export default withTheme(Navigation);
