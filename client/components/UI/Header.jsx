import '../../css/Header.css';
import React, { useContext } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { AppUser } from '../../context/user-context';

function Header(props) {
  const { user, updateUser } = useContext(AppUser);

  return (
    <Navbar bg="dark" variant="dark" style={{ height: 50 }}>
      <Navbar.Brand className="header-brand">
        GM Screen
      </Navbar.Brand>
      <Navbar.Text>{user.userName}</Navbar.Text>
      <Navbar.Text>{user.userRole}</Navbar.Text>
      <button onClick={() => { updateUser({ userName: 'Steve' }); }}
      >Steve</button>
    </Navbar>
  );
}

export default Header;
