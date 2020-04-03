import React, { useState, useEffect, useContext } from 'react';
import ContainerCard from '@components/UI/ContainerCard';
import Loading from '@components/UI/Loading';
import Button from 'react-bootstrap/Button';
import { AppUser } from '@client/context/user-context';
import { Campaign } from '@client/context/campaign-context';
import { guestCampaign } from '@client/lib/guest-users';

export default function ChooseCampaign() {
  const [Campaigns, setCampaigns] = useState(<Loading/>);
  const { user } = useContext(AppUser);
  const { updateCampaign } = useContext(Campaign);
  const { loading, campaignsArray } = useCampaigns(user);

  useEffect(() => {
    if (loading) {
      setCampaigns(<Loading/>);
    }
  }, [loading, campaignsArray]);

  return (
    <ContainerCard
      className="align-self-center mx-auto"
      percentHeight={75}
      percentWidth={25}
      bg="#343a40" shadow={true}
      footer={<div className="d-flex justify-content-center align-items-center h-100 w-100">
        <Button
          variant="success"
          onClick={() => { updateCampaign(guestCampaign); }}>Guest Campaign</Button>
      </div>}>
      <Campaigns/>
    </ContainerCard>
  );
}

function useCampaigns(user) {
  const [loading] = useState(false);
  const [campaignsArray] = useState([]);

  return { loading, campaignsArray };
}
