import './Header.css';
import React, { useContext, useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import QuickTour from '@components/modals/QuickTour';
import { AppUser } from '@client/context/user-context';
import { Campaign } from '@client/context/campaign-context';
import { Session } from '@client/context/session-context';
import { blankUser, blankCampaign, blankSession } from '@client/lib/blank-state';
import Chat from '@components/UI/Chat';

export default function Header(props) {
  const { user, updateUser } = useContext(AppUser);
  const { updateCampaign } = useContext(Campaign);
  const { updateSession } = useContext(Session);

  const [openQuickTour, setOpenQuickTour] = useState(false);

  let RoleIcon = null;
  switch (user.userRole) {
    case 'gm':
      RoleIcon = <i className="fas fa-hat-wizard text-danger" />;
      break;
    case 'player':
      RoleIcon = <i className="fas fa-dice text-info" />;
      break;
  }

  const returnToMenu = () => {
    updateSession(blankSession);
    updateCampaign(blankCampaign);
    updateUser(blankUser);
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" style={{ height: 50 }} className="app-header">
        <Navbar.Brand className="header-brand" style={{ width: 50 }}>
          <DropdownButton
            variant='secondary' role='menu'
            title={
              <img
                src="./assets/GM-Screen-logo.svg"
                alt="GM Screen"
                className="d-inline-block align-top logo mr-2" />}
            id="home-dropdown">
            <Dropdown.Item eventKey="1" className="pl-1" onClick={returnToMenu}>
              <span className="mini-logo mr-2"><i className="fas fa-home mini-logo"/></span>
              Return to Main Menu
            </Dropdown.Item>
            <Dropdown.Item eventKey="2" className="pl-1" onClick={() => { setOpenQuickTour(true); }}>
              <span className="mini-logo mr-2"><i className="fas fa-question mini-logo"/></span>
              Quick Tour / Help
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item eventKey="3" className="pl-1"
              target="_blank" rel="noopener noreferrer"
              href="https://slightlyskewedcreations.com">
              <img className="mini-logo mr-2" src="./assets/ssc192.png"/>
                Visit SlightlySkewedCreations.com
            </Dropdown.Item>
          </DropdownButton>

        </Navbar.Brand>
        <Navbar.Text className={`user-name${!user.userName ? ' fade-out' : ''}`}>{user.userName}</Navbar.Text>
        <Navbar.Text className={`role-icon${!user.userRole ? ' fade-out' : ''}`}>{RoleIcon}</Navbar.Text>
        {user.userId && <Chat infoMessages={props.infoMessages}/>}
      </Navbar>
      {openQuickTour && <QuickTour closeModal={() => { setOpenQuickTour(false); }}/>}
    </>
  );
}
