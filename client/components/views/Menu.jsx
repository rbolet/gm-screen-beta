import React, { useState, useContext } from 'react';
import Body from '@components/UI/Body';
import Login from '@components/Login';
import CampaignConfig from '@components/CampaignConfig';
import { AppUser } from '@client/context/user-context';
import { Campaign } from '@client/context/campaign-context';
// import ChooseCampaign from '@components/UI/ChooseCampaign';
import { guestCampaign } from '@client/lib/guestUsers';

function Menu(props) {
  const { user } = useContext(AppUser);
  const { campaign, updateCampaign } = useContext(Campaign);

  const [CurrentMenu, setCurrentMenu] = useState(<Login/>);
  if (!user.userId) {
    setCurrentMenu(<Login/>);
  } else if (!campaign.campaignId) {
    updateCampaign(guestCampaign);
    setCurrentMenu(<CampaignConfig/>);
  }

  return (
    <Body>
      {CurrentMenu}
    </Body>
  );
}

export default Menu;
