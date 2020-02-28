import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import * as Styled from './styled';
import styled, { keyframes } from 'styled-components';

const FadeIn = keyframes`
from {
  opacity: 0;
}
to {
  opacity: 1;
}
`;

const FadeOut = keyframes`
from {
  opacity: 1;
}
to {
  opacity: 0;
}
`;
const Page = styled.div``;

const Content = styled(Page)`
`;

const SignInPage = () => {

	return (
		<Styled.Grid>
			<Styled.Wrapper>
				<Styled.Header>Sign In</Styled.Header>
				<SignInForm />
				<Styled.textWrapper>
					<PasswordForgetLink />
					<SignUpLink />
				</Styled.textWrapper>
			</Styled.Wrapper>
		</Styled.Grid>
	);

};

const INITIAL_STATE = {
	email: '',
	password: '',
	error: null
};
class SignInFormBase extends Component {
	constructor(props) {
		super(props);
		this.state = { ...INITIAL_STATE };
	}
	onSubmit = (event) => {
		const { email, password } = this.state;

		this.props.firebase
			.doSignInWithEmailAndPassword(email, password)
			.then(() => {
				this.setState({ ...INITIAL_STATE });
				this.props.history.push(ROUTES.DASHBOARD);
			})
			.catch((error) => {
				this.setState({ error });
			});
		event.preventDefault();
	};
	onChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};
	render() {
		const { email, password, error } = this.state;
		const isInvalid = password === '' || email === '';

		return (
			<form onSubmit={this.onSubmit}>
				{' '}
				<Styled.Form
					name="email"
					value={email}
					onChange={this.onChange}
					type="text"
					placeholder="Email Address"
				/>
				<br />
				<Styled.Form
					name="password"
					value={password}
					onChange={this.onChange}
					type="password"
					placeholder="Password"
				/>
				<br />
				<Styled.Submit disabled={isInvalid} type="submit">
					Sign In
				</Styled.Submit>
				{error && <p> {error.message}</p>}
			</form>
		);
	}
}

const SignInForm = compose(withRouter, withFirebase)(SignInFormBase);
export default SignInPage;
export { SignInForm };
