import React, { useState, useEffect, useContext } from 'react';
import { withFirebase } from '../Firebase';
import { AuthUserContext } from '../Session';
import * as ROLES from '../../constants/roles';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 290px;
  height: 550px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background: ${props => props.theme.cardColor};
  box-shadow: 0 0 20px #ddd;
  border-radius: 10px;
`;

const H2 = styled.h2`
  font-weight: lighter;
  margin: 0;
`;

const Input = styled.input`
  padding: 9px;
  font-size: 14px;
  border: none;
  margin-top: 1em;
  background: #eaeaea;
`;

const Button = styled.button`
  background: #e8f0fe;
  border: none;
  font-size: 12px;
  display: block;
`;

const Select = styled.select`
  height: 1.8rem;
  text-align: center;
  margin: 0 1rem 1rem 0;
  box-shadow: 0 0 20px #ddd;
  outline: none;
  border: none;
  font-weight: ${props => (props.selected ? '700' : '100')};

  width: 80%;
  max-width: 200px;
  margin: 0.1rem auto;

  cursor: pointer;
`;

const Form = styled.form`
display: flex;
flex-direction: column;
`;


const UserManagement = ({ firebase }) => {
  const { uid, orgId } = useContext(AuthUserContext);
  const [users, setUsers] = useState([]);

  // subscribe to the organizations users and add to state
  useEffect(() => {
    firebase
      .users()
      .where('orgId', '==', orgId)
      .onSnapshot(users => {
        const orgUsers = [];
        users.forEach(user => orgUsers.push({ id: user.id, ...user.data() }));
        setUsers(orgUsers);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddUser = e => {
    e.preventDefault();
    console.log('hej')

    const email = e.target.email.value;
    const role = e.target.role.value;

    // TODO: add users to auth so they can actually login
    // currently we generate a fake uid..
    const uid = `nonAuthUser-${Date.now()}`;

    firebase.addOrganizationUser({ uid, orgId, email, role });

    e.target.email.value = '';
  };

  const handleDeleteUser = e => {
    const uid = e.target.dataset.id;

    if (uid) {
      firebase.removeOrganizationUser({ uid, orgId });
    }
  };

  return (
    <Wrapper>
      <H2>Add User</H2>

      <Form onSubmit={handleAddUser}>
        <Input name="email" type="email" placeholder="jane.doe@domain.tld" />
        <Select name="role" defaultValue={ROLES.USER}>
          <option value={ROLES.ADMIN}>Admin</option>
          <option value={ROLES.USER}>User</option>
        </Select>
        <Button type="submit">Add user</Button>
      </Form>
      <ul>
        {users &&
          users.map(user => (
            <li key={user.id}>
              <span>
                {user.email} - {user.role}
              </span>
              <Button
                data-id={user.id}
                onClick={handleDeleteUser}
                disabled={uid === user.id ? true : null}
              >
                Delete
              </Button>
            </li>
          ))}
      </ul>
    </Wrapper>
  );
};

export default withFirebase(UserManagement);
