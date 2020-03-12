import '../../css/Header.css';
import React, { useContext } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { AppUser } from '../../index';

function Header(props) {
  const { user } = useContext(AppUser);

  return (
    <Navbar bg="dark" variant="dark" style={{ height: 50 }}>
      <Navbar.Brand className="header-brand">
        GM Screen
      </Navbar.Brand>
      <Navbar.Text>{user.userName}</Navbar.Text>
      <Navbar.Text>{user.userRole}</Navbar.Text>
    </Navbar>
  );
}

export default Header;
