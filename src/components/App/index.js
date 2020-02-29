import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import DashboardPage from '../DashboardPage';
import AccountPage from '../AccountPage';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { Theme } from '../GlobalStyles';
import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import * as Styled from './styled';

const GlobalStyle = createGlobalStyle`

*,
*::before,
*::after {

  // box-sizing: border-box;
  // border: 0;
  // font-style: normal;
}
body {
  background-color: ${props => props.theme.bgPrimary};
  padding: 0;
  margin: 0;
  font-family: 'Open Sans', sans-serif;

}
  html {
    margin: 0; 
    padding: 0; 
  }

}`;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null
    };
  }
  render() {
    return (
      <ThemeProvider theme={Theme}>
        <Router>
          <GlobalStyle bg />

          <Navigation authUser={this.state.authUser} />
          <Route
            render={({ location }) => (
              <TransitionGroup component={null}>
                <CSSTransition
                  in={this.state.in}
                  key={location.key}
                  timeout={{ enter: 450, exit: 450 }}
                  classNames="page"
                  className="transition"
                >
                  <Styled.GridLayout>
                    <Switch location={location}>
                      <Route
                        exact
                        path={ROUTES.LANDING}
                        component={LandingPage}
                      />
                      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
                      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
                      <Route
                        path={ROUTES.PASSWORD_FORGET}
                        component={PasswordForgetPage}
                      />
                      <Route path={ROUTES.ACCOUNT} component={AccountPage} />
                      <Route
                        path={ROUTES.DASHBOARD}
                        component={DashboardPage}
                      />
                    </Switch>
                  </Styled.GridLayout>
                </CSSTransition>
              </TransitionGroup>
            )}
          />
        </Router>
      </ThemeProvider>
    );
  }
}

export default withAuthentication(App);
