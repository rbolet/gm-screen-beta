import './ChooseCampaign.css';
import React, { useState, useEffect, useContext } from 'react';
import Card from 'react-bootstrap/Card';
import ContainerCard from '@components/UI/ContainerCard';
import Loading from '@components/UI/Loading';
import Button from 'react-bootstrap/Button';
import { AppUser } from '@client/context/user-context';
import { Campaign } from '@client/context/campaign-context';
import { guestCampaign } from '@client/lib/guest-users';
import { getCampaigns } from '@client/lib/api';

export default function ChooseCampaign() {
  const { updateCampaign } = useContext(Campaign);

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
      <div className="campaign-list-container">
        <Card className="w-100 h-100">
          <Card.Body className="p-0">
            <Campaigns/>
          </Card.Body>
        </Card>
      </div>
    </ContainerCard>
  );
}

function Campaigns() {
  const { user } = useContext(AppUser);
  const [fetched, setFetched] = useState(false);
  const [CampaignRows, setCampaignRows] = useState([]);
  const { loading, campaigns } = useCampaigns(fetched);

  useEffect(() => {
    if (campaigns.length) {
      setFetched(true);
      setCampaignRows(
        campaigns.map(campaign => {
          return (<tr
            key={campaign.campaignId}
            className={'list-display w-100 border-bottom row-no-gutters'}
            onClick={() => { }}>
            <td className="p-2 col">{campaign.campaignName}</td>
            <td className="d-flex justify-content-end col p-0 m-0">
              {user.userRole === 'gm' &&
                <button
                  className="btn btn-danger"
                  onClick={() => { }}>
                  <i className="far fa-trash-alt" />
                </button>}
            </td>
          </tr>);
        })
      );
    }
  }, [campaigns]);

  if (loading) {
    return <Loading/>;
  } else if (CampaignRows.length) {
    return (
      <table className="m-0 w-100" id="campaign-list">
        <tbody id="campaign-table-body">
          { CampaignRows }
        </tbody>
      </table>
    );
  }

  return <EmptySet/>;
}

function useCampaigns(fetched) {
  const { user } = useContext(AppUser);
  const [loading, setLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    if (!fetched) {
      setLoading(true);
      getCampaigns(user).then(campaignArray => {
        setCampaigns(campaignArray);
        setLoading(false);
      });
    }
  }, [fetched]);

  return { loading, campaigns };
}

function EmptySet() {
  const { user } = useContext(AppUser);
  const Text = (user.userRole === 'gm')
    ? <p>Start <span> <i className="fas fa-plus-circle text-success"/></span> a new Campaign</p>
    : (<p>No active Campaign sessions to join.<br/>
      Click <span> <i className="fas fa-redo-alt text-success"/></span> to check again!</p>);

  return (
    <div className="d-flex justify-content-center align-items-center h-100">
      <div className="img-thumbnail text-muted text-center">
        {Text}
      </div>
    </div>
  );

}
