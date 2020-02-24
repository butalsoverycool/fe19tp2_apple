import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { Theme } from '../GlobalStyles';
import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';

const GlobalStyle = createGlobalStyle`
body {
  background-color: ${props => props.theme.bgPrimary};
  padding: 0;
  margin: 0;
  font-family: 'Open Sans', sans-serif;

  html {
    margin: 0; 
    padding: 0; 
  }
  
}
`;

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
          <div>
            <Navigation authUser={this.state.authUser} />
            <Route exact path={ROUTES.LANDING} component={LandingPage} />
            <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
            <Route path={ROUTES.SIGN_IN} component={SignInPage} />
            <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
            <Route path={ROUTES.HOME} component={HomePage} />
            <Route path={ROUTES.ACCOUNT} component={AccountPage} />
            <Route path={ROUTES.ADMIN} component={AdminPage} />
          </div>
        </Router>
      </ThemeProvider>
    );
  }
}

export default withAuthentication(App);
