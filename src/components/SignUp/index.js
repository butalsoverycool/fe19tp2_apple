import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
const SignUpPage = () => (
  <div>
    <h1>Sign up</h1>
    <SignUpForm />
  </div>
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
          .add({ name, users: [uid] })
          .then(org => {
            // create user in 'users' collection as admin and add org ID
            this.props.firebase.user(uid).set(
              {
                email,
                orgId: org.id,
                role: 'Admin',
                settings: { color: '', logo: '' }
              },
              { merge: true }
            );
          });

        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
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
      <form onSubmit={this.onSubmit}>
        <input
          name='name'
          onChange={this.onChange}
          type='text'
          placeholder='Organization name'
        />
        <input
          name='email'
          value={email}
          onChange={this.onChange}
          type='text'
          placeholder='Email Adress'
        />
        <input
          name='passwordOne'
          value={passwordOne}
          onChange={this.onChange}
          type='password'
          placeholder='Password'
        />{' '}
        <input
          name='passwordTwo'
          value={passwordTwo}
          onChange={this.onChange}
          type='password'
          placeholder='Confirm Password'
        />
        <button disabled={isInvalid} type='submit'>
          Sign Up
        </button>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}
const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}> Sign Up</Link>
  </p>
);

const SignUpForm = compose(withRouter, withFirebase)(SignUpFormBase);

export default SignUpPage;
export { SignUpForm, SignUpLink };
