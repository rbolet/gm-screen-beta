import React from 'react';
import ContainerCard from './ContainerCard';
import Button from 'react-bootstrap/Button';
import { guestCampaign } from '../logic/guestUsers';
import { Campaign } from '../../context/campaign-context';

export default function ChooseCampaign() {
  const { updateCampaign } = React.useContext(Campaign);

  return (
    <ContainerCard
      className="align-self-center mx-auto"
      percentHeight={75}
      percentWidth={25}
      bg="#343a40" shadow={true}>
      <div className="d-flex justify-content-center align-items-center h-100 w-100">
        <Button
          variant="success"
          onClick={() => { updateCampaign(guestCampaign); }}>Guest Campaign</Button>
      </div>
    </ContainerCard>
  );
}
