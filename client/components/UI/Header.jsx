import '../../css/Header.css';
import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { useUser } from '../logic/useConfig';

function Header(props) {
  const user = useUser();

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
