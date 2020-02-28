import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import * as Styled from './styled';

const PasswordForgotPage = () => {

	return (
		<Styled.Grid>
			<Styled.Wrapper>
				<Styled.Header>Password Forgot</Styled.Header>
				<PasswordForgetForm />
			</Styled.Wrapper>
		</Styled.Grid>
	);

};

const INITIAL_STATE = {
	email: '',
	error: null
};

class PasswordForgetFormBase extends Component {
	constructor(props) {
		super(props);

		this.state = { ...INITIAL_STATE };
	}

	onSubmit = (event) => {
		const { email } = this.state;

		this.props.firebase
			.doPasswordReset(email)
			.then(() => {
				this.setState({ ...INITIAL_STATE });
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
		const { email, error } = this.state;
		const isInvalid = email === '';
		return (
			<form onSubmit={this.onSubmit}>
				<Styled.Form
					name="email"
					value={this.state.email}
					onChange={this.onChange}
					type="text"
					placeholder="Email Address"
				/>
				<br />
				<Styled.Submit disabled={isInvalid} type="submit">
					Reset My Password
				</Styled.Submit>
				{error && <p>{error.message}</p>}
			</form>
		);
	}

}

const PasswordForgetLink = () => (
	<p>
		<Styled.ForgotLink to={ROUTES.PASSWORD_FORGET}>
			Forgot Password?
		</Styled.ForgotLink>
	</p>
);

export default PasswordForgotPage;
const PasswordForgetForm = withFirebase(PasswordForgetFormBase);
export { PasswordForgetForm, PasswordForgetLink };
