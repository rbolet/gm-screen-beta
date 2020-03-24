import './Header.css';
import React, { useContext } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { AppUser } from '@client/context/user-context';
import { Campaign } from '@client/context/campaign-context';
import Chat from '@components/UI/Chat';

function Header(props) {
  const { user } = useContext(AppUser);
  const { campaign } = useContext(Campaign);

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
    <Navbar bg="dark" variant="dark" style={{ height: 50 }} className="header">
      <Navbar.Brand className="header-brand">
        GM Screen
      </Navbar.Brand>
      <Navbar.Text className="user-name">{user.userName}</Navbar.Text>
      <Navbar.Text className="role-icon">{RoleIcon}</Navbar.Text>
      <Navbar.Text className="campaign">{campaign.campaignName}</Navbar.Text>
      <Chat/>
    </Navbar>
  );
}

export default Header;
