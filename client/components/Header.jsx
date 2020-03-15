import './Header.css';
import React, { useContext } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { AppUser } from '../context/user-context';
import { Campaign } from '../context/campaign-context';

function Header(props) {
  const { user, updateUser } = useContext(AppUser);
  const { updateCampaign } = useContext(Campaign);

  const guestGMLogin = { userId: 5, userName: 'Guest GM', userRole: 'gm' };
  const guestPlayerLogin = { userId: 6, userName: 'Guest Player', userRole: 'player' };
  const guestCampaign = {
    campaignId: 2,
    campaignName: 'Guest Campaign',
    campaignGM: 5,
    campaignAssets: [
      {
        imageId: 4,
        fileName: '9cf9225a-979f-40cc-a934-e270c1c752a9..jpg',
        category: 'Environment',
        alias: 'Village'
      },
      {
        imageId: 5,
        fileName: '0c00a350-dfbb-4d8f-98af-e0815bbdaefb..png',
        category: 'Secondary',
        alias: 'Elf'
      }
    ]
  };

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
        <Button variant="danger"
          onClick={() => {
            updateUser(guestGMLogin); updateCampaign(guestCampaign);
          }}>Guest GM</Button>
      </Navbar.Text>
      <Navbar.Text className="px-2">
        <Button variant="warning" onClick={() => { updateUser(guestPlayerLogin); }}>Guest Player</Button>
      </Navbar.Text>
    </Navbar>
  );
}

export default Header;
