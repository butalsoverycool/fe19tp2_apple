import React, { Component } from 'react';
import { compose } from 'recompose';
import { AuthUserContext, withAuthorization } from '../Session';
import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import styled from 'styled-components';
import { withFirebase } from '../Firebase';
import { withTheme } from '../Theme';
import LogoUploader from './LogoUploader';
import Colorpicker from './Colorpicker';

const Wrapper = styled.div`
  margin: auto;
  width: 100vw;
  max-width: 600px;
  background-color: ${props => props.themeBg || 'none'};
`;

class AccountPage extends Component {
  render() {
    //theme
    const { color } = this.props.theme.state;
    const { saveChanges } = this.props.theme.setters;
    return (
      <Wrapper themeBg={color.hex}>
        <AuthUserContext.Consumer>
          {authUser => (
            <div>
              <h1>Admin: {authUser.email}</h1>
              <PasswordChangeForm />
            </div>
          )}
        </AuthUserContext.Consumer>

        <LogoUploader />

        <Colorpicker />
        <button type='button' onClick={saveChanges}>
          Save Changes
        </button>
      </Wrapper>
    );
  }
}
const condition = authUser => !!authUser;

export default compose(
  withFirebase,
  withTheme,
  withAuthorization(condition)
)(AccountPage);
