import React, { Component } from 'react';
import { compose } from 'recompose';
import { AuthUserContext, withAuthorization } from '../Session';
import { PasswordChangePage } from '../PasswordChange';
import styled from 'styled-components';
import { withFirebase } from '../Firebase';
import { withTheme } from '../Theme';
import UserManagement from './UserManagement';
import CompanyConfig from './CompanyConfig';

const Container = styled.div`
  display: flex;
  margin: 0 auto;
  width: 100vw;
  flex-wrap: wrap;
  justify-content: center;
`;

const AdminWrapper = styled.div`
  width: 100vw;
  height: 50px;
  text-align: center;
  margin: 0rem 2rem 3rem 2rem;
`;

class AccountPage extends Component {
  render() {
    //theme
    const { color } = this.props.theme.state;
    const { saveChanges } = this.props.theme.setters;
    return (
      <>
        <Container themeBg={color.hex}>
          <AuthUserContext.Consumer>
            {authUser => <AdminWrapper></AdminWrapper>}
          </AuthUserContext.Consumer>

          {/* <Wrapper> */}
          <CompanyConfig saveChanges={saveChanges} />
          {/* </Wrapper> */}
          {/* <Wrapper> */}
          <UserManagement />
          {/* </Wrapper> */}
          {/* <Wrapper> */}
          <PasswordChangePage />
          {/* </Wrapper> */}
        </Container>
      </>
    );
  }
}
const condition = authUser => !!authUser;

export default compose(
  withFirebase,
  withTheme,
  withAuthorization(condition)
)(AccountPage);
