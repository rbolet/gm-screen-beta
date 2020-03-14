import '../css/Header.css';
import React, { useContext } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { AppUser } from '../context/user-context';

function Header(props) {
  const { user, updateUser } = useContext(AppUser);

  const guestGMLogin = { userId: 5, userName: 'Guest GM', userRole: 'gm' };
  const guestPlayerLogin = { userId: 6, userName: 'Guest Player', userRole: 'player' };

  let RoleIcon = null;
  switch (user.userRole) {
    case 'gm':
      RoleIcon = <i className="fas fa-hat-wizard text-danger" />;
      break;
    case 'player':
      RoleIcon = <i className="fas fa-dice text-warning" />;
      break;
  }

  return (
    <Navbar bg="dark" variant="dark" style={{ height: 50 }}>
      <Navbar.Brand className="header-brand">
        GM Screen
      </Navbar.Brand>
      <Navbar.Text className="user-name">{user.userName}</Navbar.Text>
      <Navbar.Text className="role-icon">{RoleIcon}</Navbar.Text>
      <Navbar.Text className="px-2">
        <Button variant="danger" onClick={() => { updateUser(guestGMLogin); }}>Guest GM</Button>
      </Navbar.Text>
      <Navbar.Text className="px-2">
        <Button variant="warning" onClick={() => { updateUser(guestPlayerLogin); }}>Guest Player</Button>
      </Navbar.Text>
    </Navbar>
  );
}

export default Header;
