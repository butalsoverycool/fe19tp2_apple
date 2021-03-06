import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import * as Styled from './styled';

const SignUpPage = () => (
  <Styled.Grid>
    <Styled.Wrapper>
      <Styled.Header>Sign up</Styled.Header>
      <SignUpForm />
    </Styled.Wrapper>
  </Styled.Grid>
);
const INITIAL_STATE = {
  name: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null
};
class SignUpFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { name, email, passwordOne } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        const { uid, email } = authUser.user;

        // create org in 'organizations' collection and add user ID
        this.props.firebase
          .organizations()
          .add({ name, users: [uid], color: null, logoUrl: null })
          .then(org => {
            // create user in 'users' collection as admin and add org ID
            this.props.firebase.user(uid).set({
              email,
              orgId: org.id,
              role: ROLES.ADMIN
            });
          });

        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.DASHBOARD);
      })
      .catch(error => {
        this.setState({ error });
      });
    event.preventDefault();
  };
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  onChangeCheckbox = event => {
    this.setState({ [event.target.name]: event.target.checked });
  };
  render() {
    const { name, email, passwordOne, passwordTwo, error } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo || passwordOne === '' || name === '';

    return (
      <Styled.FormWrapper>
        <form onSubmit={this.onSubmit}>
          <Styled.Form
            name="name"
            onChange={this.onChange}
            type="text"
            placeholder="Organization name"
          />
          <br />
          <Styled.Form
            name="email"
            value={email}
            onChange={this.onChange}
            type="text"
            placeholder="Email Adress"
          />
          <br />
          <Styled.Form
            name="passwordOne"
            value={passwordOne}
            onChange={this.onChange}
            type="password"
            placeholder="Password"
          />{' '}
          <br />
          <Styled.Form
            name="passwordTwo"
            value={passwordTwo}
            onChange={this.onChange}
            type="password"
            placeholder="Confirm Password"
          />
          <br />
          <Styled.Submit disabled={isInvalid} type="submit">
            Sign Up
          </Styled.Submit>
          {error && <Styled.Error>{error.message}</Styled.Error>}
        </form>
      </Styled.FormWrapper>
    );
  }
}
const SignUpLink = () => (
  <Styled.Text>
    Don't have an account? <Link to={ROUTES.SIGN_UP}> Sign Up</Link>
  </Styled.Text>
);

const SignUpForm = compose(withRouter, withFirebase)(SignUpFormBase);

export default SignUpPage;
export { SignUpForm, SignUpLink };
