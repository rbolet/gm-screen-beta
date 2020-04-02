import React, { useState, useContext, useEffect } from 'react';
import Body from '@components/UI/Body';
import Login from '@components/Login';
import CampaignConfig from '@components/CampaignConfig';
import { AppUser } from '@client/context/user-context';
import { Campaign } from '@client/context/campaign-context';
import ChooseCampaign from '@components/ChooseCampaign';
// import { guestCampaign } from '@client/lib/guestUsers';

function Menu(props) {
  const { user } = useContext(AppUser);
  const { campaign } = useContext(Campaign);

  const [CurrentMenu, setCurrentMenu] = useState(<Login/>);

  useEffect(() => {
    if (!user.userId) {
      setCurrentMenu(<Login />);
    } else {
      // updateCampaign(guestCampaign);
      setCurrentMenu(<ChooseCampaign/>);
    }
  }, [user.userId]);

  useEffect(() => {
    if (campaign.campaignId) {
      setCurrentMenu(<CampaignConfig />);
    }
  }, [campaign.campaignId]);

  return (
    <Body>
      {CurrentMenu}
    </Body>
  );
}

export default Menu;
