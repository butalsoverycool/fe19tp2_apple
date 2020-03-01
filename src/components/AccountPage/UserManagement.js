import React, { useState, useEffect, useContext } from 'react';
import { withFirebase } from '../Firebase';
import { AuthUserContext } from '../Session';
import * as ROLES from '../../constants/roles';

import fireGhost from '../Firebase/fireGhost';

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
  }, []);

  const handleAddUser = e => {
    e.preventDefault();

    const email = e.target.email.value;
    const role = e.target.role.value;

    // TODO: add users to auth so they can actually login
    // currently we generate a fake uid..
    const uid = `nonAuthUser-${Date.now()}`;

    //firebase.addOrganizationUser({ uid, orgId, email, role });

    e.target.email.value = '';

    fireGhost(firebase).create(email, '123456', orgId);
  };

  const handleDeleteUser = e => {
    const uid = e.target.dataset.id;

    if (uid) {
      firebase.removeOrganizationUser({ uid, orgId });
    }
  };

  return (
    <div>
      <h2>Users</h2>
      <form onSubmit={handleAddUser}>
        <input name="email" type="email" placeholder="jane.doe@domain.tld" />
        <select name="role" defaultValue={ROLES.USER}>
          <option value={ROLES.ADMIN}>Admin</option>
          <option value={ROLES.USER}>User</option>
        </select>
        <button type="submit">Add user</button>
      </form>
      <ul>
        {users &&
          users.map(user => (
            <li key={user.id}>
              <span>
                {user.email} - {user.role}
              </span>
              <button
                data-id={user.id}
                onClick={handleDeleteUser}
                disabled={uid === user.id ? true : null}
              >
                Delete
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default withFirebase(UserManagement);
