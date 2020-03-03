import React, { Component } from 'react';
import { compose } from 'recompose';
import { AuthUserContext, withAuthorization } from '../Session';
import PasswordChangeForm from '../PasswordChange';
import { withFirebase } from '../Firebase';
import { withTheme } from '../Theme';
import LogoUploader from './LogoUploader';
import Colorpicker from './Colorpicker';
import * as Styled from './styled';
import UserManagement from './UserManagement';
import PopupMsg from '../PopupMsg';

/* const Wrapper = styled.div`
  margin: auto;
  width: 100vw;
  max-width: 600px;
  background-color: ${props => props.themeBg || 'none'};
`; */

class AccountPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newSave: false
    };
  }

  // temp* ugly timeout solution
  saveCallback = () => {
    this.setState(
      {
        newSave: true
      },
      () => this.saveTimeout()
    );
  };

  saveTimeout = () => {
    setTimeout(() => {
      this.setState({
        newSave: false
      });
    }, 2400);
  };

  render() {
    //theme
    const { color } = this.props.theme.state;
    const { saveChanges } = this.props.theme.setters;

    const { newSave } = this.state;

    return (
      <Styled.Wrapper themeBg={color.hex}>
        {newSave ? <PopupMsg txt="Saved!" enter={true} timeout={2000} /> : null}

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
        <button type="button" onClick={() => saveChanges(this.saveCallback)}>
          Save Changes
        </button>
        <UserManagement />
      </Styled.Wrapper>
    );
  }
}
const condition = authUser => !!authUser;

export default compose(
  withFirebase,
  withTheme,
  withAuthorization(condition)
)(AccountPage);
