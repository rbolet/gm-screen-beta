import './Header.css';
import React, { useContext } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { AppUser } from '@client/context/user-context';
import { Campaign } from '@client/context/campaign-context';
import { Session } from '@client/context/session-context';
import { blankUser, blankCampaign, blankSession } from '@client/lib/blank-state';
import Chat from '@components/UI/Chat';

export default function Header(props) {
  const { user, updateUser } = useContext(AppUser);
  const { updateCampaign } = useContext(Campaign);
  const { updateSession } = useContext(Session);

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
    <Navbar bg="dark" variant="dark" style={{ height: 50 }} className="app-header">
      <Navbar.Brand className="header-brand">
        <DropdownButton
          variant='secondary' role='menu'
          title={
            <img
              src="./assets/GM-Screen-logo.svg"
              alt="GM Screen"
              className="d-inline-block align-top logo mr-2" />}
          id="home-dropdown">
          <Dropdown.Item eventKey="1" onClick={() => {
            updateSession(blankSession);
            updateCampaign(blankCampaign);
            updateUser(blankUser);
          }}>
            <span className="mini-logo mr-2"></span>Return to Main Menu
          </Dropdown.Item>

          <Dropdown.Divider />
          <Dropdown.Item eventKey="4" className="pl-1"
            target="_blank" rel="noopener noreferrer" href="https://slightlyskewedcreations.com">
            <img className="mini-logo mr-2" src="./assets/ssc192.png"/>
              Visit SlightlySkewedCreations.com
          </Dropdown.Item>
        </DropdownButton>

      </Navbar.Brand>
      <Navbar.Text className={`user-name${!user.userName ? ' fade-out' : ''}`}>{user.userName}</Navbar.Text>
      <Navbar.Text className={`role-icon${!user.userRole ? ' fade-out' : ''}`}>{RoleIcon}</Navbar.Text>
      {user.userId && <Chat/>}
    </Navbar>
  );
}
