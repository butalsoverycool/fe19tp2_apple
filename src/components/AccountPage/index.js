import React, { Component } from 'react';
import { compose } from 'recompose';
import { AuthUserContext, withAuthorization } from '../Session';
import { PasswordChangePage } from '../PasswordChange';
import styled from 'styled-components';
import { withFirebase } from '../Firebase';
import { withTheme } from '../Theme';
import LogoUploader from './LogoUploader';
import Colorpicker from './Colorpicker';
import * as Styled from './styled';
import UserManagement from './UserManagement';


class AccountPage extends Component {
  render() {
    //theme
    const { color } = this.props.theme.state;
    const { saveChanges } = this.props.theme.setters;
    return (
      <>
        {/* <Styled.Wrapper themeBg={color.hex}> */}

        <Styled.HeaderGrid>
          < AuthUserContext.Consumer >
            {authUser => (
              <div>
                <h1>Admin: {authUser.email}</h1>
              </div>
            )}
          </AuthUserContext.Consumer>

        </Styled.HeaderGrid>

        <Styled.PasswordGrid>
          {/* <PasswordWrapper> */}
          <PasswordChangePage />
          {/* </PasswordWrapper> */}
        </Styled.PasswordGrid>

        <Styled.CompanyGrid>
          <Styled.CompanyWrapper>
            <LogoUploader />
            <Colorpicker />
            <Styled.Button type="button" onClick={saveChanges}>
              Save Changes
            </Styled.Button>
          </Styled.CompanyWrapper>
        </Styled.CompanyGrid>

        <Styled.UserGrid>
          <UserManagement />
        </Styled.UserGrid>
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
