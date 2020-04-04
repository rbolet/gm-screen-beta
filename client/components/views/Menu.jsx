import React, { useState, useContext, useEffect } from 'react';
import Body from '@components/UI/Body';
import Login from '@components/Login';
import CampaignConfig from '@components/CampaignConfig';
import { AppUser } from '@client/context/user-context';
import { Campaign } from '@client/context/campaign-context';
import { Session } from '@client/context/session-context';
import ChooseCampaign from '@components/ChooseCampaign';
// import { guestCampaign } from '@client/lib/guestUsers';

function Menu(props) {
  const { user } = useContext(AppUser);
  const { campaign } = useContext(Campaign);
  const { updateSession } = useContext(Session);

  const [CurrentMenu, setCurrentMenu] = useState(<Login/>);
  const [showConfig, setShowConfig] = useState(false);

  useEffect(() => {
    if (!user.userId) {
      setCurrentMenu(<Login />);
    } else {
      setCurrentMenu(<ChooseCampaign setShowConfig={() => { setShowConfig(true); }}/>);
    }
  }, [user.userId]);

  useEffect(() => {
    if (campaign.campaignId) {
      if (user.userRole === 'gm' && showConfig) {
        setCurrentMenu(<CampaignConfig />);
      } else {
        updateSession();
      }
    } else {
      setShowConfig(false);
    }
  }, [campaign.campaignId]);

  return (
    <Body>
      {CurrentMenu}
    </Body>
  );
}

export default Menu;
