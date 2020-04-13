import './Header.css';
import React, { useContext } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { AppUser } from '@client/context/user-context';
import Chat from '@components/UI/Chat';

function Header(props) {
  const { user } = useContext(AppUser);

  let RoleIcon = null;
  switch (user.userRole) {
    case 'gm':
      RoleIcon = <i className="fas fa-hat-wizard text-danger" />;
      break;
    case 'player':
      RoleIcon = <i className="fas fa-dice text-info" />;
      break;
  }

  return (
    <Navbar bg="dark" variant="dark" style={{ height: 50 }} className="header">
      <Navbar.Brand className="header-brand">
        <div className="d-flex flex-row align-items-center">
          <a target="_blank" rel="noopener noreferrer" href="https://slightlyskewedcreations.com">
            <img
              src="./assets/ssc192.png"
              className="d-inline-block align-top logo mr-2"/>
          </a>
          <p className="mb-0 rakkas">GM Screen</p>
        </div>
      </Navbar.Brand>
      <Navbar.Text className="user-name">{user.userName}</Navbar.Text>
      <Navbar.Text className="role-icon">{RoleIcon}</Navbar.Text>
      {user.userId && <Chat/>}
    </Navbar>
  );
}

export default Header;
