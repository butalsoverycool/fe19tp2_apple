import React, { useState, useEffect, useContext } from 'react';
import { withFirebase } from '../Firebase';
import { AuthUserContext } from '../Session';
import * as ROLES from '../../constants/roles';
import styled from 'styled-components';
import { device } from '../device';

const Wrapper = styled.div`
	flex: 1;
	margin: 0.5rem 0.5rem;
	display: flex;
	height: 35rem;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	background: ${(props) => props.theme.cardColor};
	box-shadow: 0 0 20px #ddd;
	border-radius: 10px;
	overflow: hidden;
	max-width: 360px;
	min-width: 360px;

	@media (max-width: 748px) {
		min-width: 95vw;
	}
`;

const H2 = styled.h2`
	font-weight: lighter;
	justify-self: flex-start;
`;

const Input = styled.input`
	padding: 9px;
	font-size: 14px;
	border: none;
	background: #eaeaea;
	margin-top: 2em;
	border-radius: 0.2rem;
`;

const Button = styled.button`
	background: #eaeaea;
	border: none;
	font-size: 12px;
	/* display: block; */
	border-radius: 0.2rem;
`;

const Select = styled.select`
	height: 1.8rem;
	text-align: center;
	margin-bottom: 30px;
	box-shadow: 0 0 20px #ddd;
	outline: none;
	border: none;
	font-weight: ${(props) => (props.selected ? '700' : '100')};

	width: 46%;
	max-width: 200px;
	margin: 0.1rem auto;

	cursor: pointer;
`;

const UlWrapper = styled.div`
	overflow-y: scroll;
	height: 300px;
	/* background: #eaeaea; */
	margin-bottom: 30px;
	margin-top: 25px;
	font-size: 14px;
`;

const List = styled.li`margin-bottom: 10px;`;

const UserManagement = ({ firebase }) => {
	const { uid, orgId } = useContext(AuthUserContext);
	const [ users, setUsers ] = useState([]);

	// subscribe to the organizations users and add to state
	useEffect(() => {
		firebase
			.users()
			.where('orgId', '==', orgId)
			.onSnapshot((users) => {
				const orgUsers = [];
				users.forEach((user) =>
					orgUsers.push({ id: user.id, ...user.data() })
				);
				setUsers(orgUsers);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleAddUser = (e) => {
		e.preventDefault();
		console.log('hej');

		const email = e.target.email.value;
		const role = e.target.role.value;

		// TODO: add users to auth so they can actually login
		// currently we generate a fake uid..
		const uid = `nonAuthUser-${Date.now()}`;

		firebase.addOrganizationUser({ uid, orgId, email, role });

		e.target.email.value = '';
	};

	const handleDeleteUser = (e) => {
		const uid = e.target.dataset.id;

		if (uid) {
			firebase.removeOrganizationUser({ uid, orgId });
		}
	};

	return (
		<Wrapper>
			<H2>Add User</H2>
			<form onSubmit={handleAddUser}>
				<Select name="role" defaultValue={ROLES.USER}>
					<option value={ROLES.ADMIN}>Admin</option>
					<option value={ROLES.USER}>User</option>
				</Select>
				<Input
					name="email"
					type="email"
					placeholder="jane.doe@domain.tld"
				/>
				<br />
				<Button type="submit">Add user</Button>
			</form>
			<UlWrapper>
				<ul>
					{users &&
						users.map((user) => (
							<List key={user.id}>
								<span>
									{user.email} - {user.role}
								</span>
								<Button
									data-id={user.id}
									onClick={handleDeleteUser}
									disabled={
										uid === user.id ? true : null
									}
								>
									Delete
								</Button>
							</List>
						))}
				</ul>
			</UlWrapper>
		</Wrapper>
	);
};

export default withFirebase(UserManagement);
