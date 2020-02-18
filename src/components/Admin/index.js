import React, { Component } from 'react';
import { compose } from 'recompose';
import * as ROLES from '../../constants/roles';
import withAuthorization from '../Session/withAuthorization';
import styled from 'styled-components';

import { withFirebase } from '../Firebase';

import { withTheme } from '../Theme';

import LogoUploader from './LogoUploader';
import Colorpicker from './Colorpicker';

const Wrapper = styled.div`
  margin: auto;
  width: 100vw;
  max-width: 600px;
`;

class AdminPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null
    };
  }

  componentDidMount() {
    // get auth user
    this.props.firebase.auth.onAuthStateChanged(authUser => {
      authUser // (&& if user is admin )
        ? this.setState({ authUser })
        : this.setState({ authUser: null });
    });
  }

  render() {
    // if not signed in
    const authMsg = 'Please sign in to view admin page';
    if (!this.state.authUser) return <p>{authMsg}</p>;

    //theme
    const { color } = this.props.theme.state;
    const { saveChanges } = this.props.theme.setters;

    // needs condition: user role is admin
    return (
      <Wrapper themeBg={color.hex}>
        <h1>Admin</h1>

        <LogoUploader />

        <Colorpicker />

        <button onClick={saveChanges}>SAVE CHANGES</button>
      </Wrapper>
    );
  }
}

export default compose(withFirebase, withTheme)(AdminPage);
