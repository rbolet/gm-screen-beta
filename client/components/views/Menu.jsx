import React from 'react';
import Body from '@components/UI/Body';
import Login from '@components/UI/Login';
import { AppUser } from '@client/context/user-context';
import { Campaign } from '@client/context/campaign-context';
// import ChooseCampaign from '@components/UI/ChooseCampaign';
import { guestCampaign } from '@client/lib/guestUsers';
function Menu(props) {
  const { user } = React.useContext(AppUser);
  const { campaign, updateCampaign } = React.useContext(Campaign);

  let CurrentMenu;
  if (!user.userId) {
    CurrentMenu = <Login/>;
  } else if (!campaign.campaignId) {
    // CurrentMenu = <ChooseCampaign/>
    updateCampaign(guestCampaign);
  }

  return (
    <Body>
      {CurrentMenu}
    </Body>
  );
}

export default Menu;
