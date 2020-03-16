import React from 'react';
import Body from '../UI/Body';
import Login from '../UI/Login';
import { AppUser } from '../../context/user-context';
import { Campaign } from '../../context/campaign-context';
import ChooseCampaign from '../UI/ChooseCampaign';

function Menu(props) {
  const { user } = React.useContext(AppUser);
  const { campaign } = React.useContext(Campaign);

  let CurrentMenu;
  if (!user.userId) {
    CurrentMenu = <Login/>;
  } else if (!campaign.campaignId) {
    CurrentMenu = <ChooseCampaign/>;
  }

  return (
    <Body>
      {CurrentMenu}
    </Body>
  );
}

export default Menu;
