import React, { useState, useContext, useEffect } from 'react';
import Body from '@components/UI/Body';
import Login from '@components/Login';
import { AppUser } from '@client/context/user-context';
import { Campaign } from '@client/context/campaign-context';
import { Session } from '@client/context/session-context';
import ChooseCampaign from '@components/ChooseCampaign';

function Menu(props) {
  const { user } = useContext(AppUser);
  const { campaign } = useContext(Campaign);
  const { updateSession } = useContext(Session);

  const [CurrentMenu, setCurrentMenu] = useState(<Login/>);

  useEffect(() => {
    if (!user.userId) {
      setCurrentMenu(<Login />);
    } else {
      setCurrentMenu(<ChooseCampaign/>);
    }
  }, [user.userId]);

  useEffect(() => {
    if (campaign.campaignId) updateSession();
  }, [campaign.campaignId]);

  return (
    <Body>
      {CurrentMenu}
    </Body>
  );
}

export default Menu;
