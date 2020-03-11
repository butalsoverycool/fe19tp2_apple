import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import * as Styled from './styled';

const PasswordChangePage = () => (
  <>
    <Styled.Wrapper>
      <Styled.H2>Change Password</Styled.H2>
      <PasswordChangeForm />
    </Styled.Wrapper>
  </>
);

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }
  onSubmit = event => {
    const { passwordOne } = this.state;

    this.props.withFirebase.doPasswordUpdate(passwordOne).then(() => {
      this.setState({ ...INITIAL_STATE });
    });

    event.preventDefault();
  };
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const { passwordOne, passwordTwo, error } = this.state;

    const isInvalid = passwordOne !== passwordTwo || passwordOne === '';
    return (
      <Styled.FormWrapper onSubmit={this.onSubmit}>
        <Styled.Input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="New Password"
          autoComplete="off"
        />
        <br />
        <Styled.Input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm New Password"
          autoComplete="off"
        />
        <br />
        <Styled.Submit disabled={isInvalid} type="submit">
          Change password
        </Styled.Submit>
        {error && <p>{error.message}</p>}
      </Styled.FormWrapper>
    );
  }
}
export default withFirebase(PasswordChangeForm);
export { PasswordChangePage };
