import './ChooseCampaign.css';
import React, { useState, useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ContainerCard from '@components/UI/ContainerCard';
import Loading from '@components/UI/Loading';
import { AppUser } from '@client/context/user-context';
import { Campaign } from '@client/context/campaign-context';
import { getCampaigns } from '@client/lib/api';

export default function ChooseCampaign() {
  const [selectedCampaign, setSelectedCampaign] = useState({});

  return (
    <ContainerCard
      className="align-self-center mx-auto"
      percentHeight={75}
      percentWidth={25}
      bg="#343a40" shadow={true}>
      <div className="campaign-list-container">
        <Card className="w-100 h-100 bg-dark border-0">
          <Card.Header>
            <CampaignListHeader/>
          </Card.Header>
          <Card.Body className="p-0 h-100 bg-light mb-2 rounded">
            <CampaignList setSelectedCampaign={setSelectedCampaign}/>
          </Card.Body>
          <Card.Footer className="d-flex justify-content-around p-0">
            <CampaignListFooter selectedCampaign={selectedCampaign}/>
          </Card.Footer>
        </Card>
      </div>
    </ContainerCard>
  );
}

function CampaignListHeader() {
  const { user } = useContext(AppUser);

  let Icon = <i className="fas fa-dice text-info" />;

  if (user.userRole === 'gm') {
    Icon = <i className="fas fa-hat-wizard text-danger" />;
  }

  return (
    <h5 className="text-light text-center">
      {`${(user.userRole === 'gm') ? 'Choose' : 'Join'} Campaign`}
      <span className="mx-2">{Icon}</span>
    </h5>
  );
}

function CampaignList(props) {
  const { user } = useContext(AppUser);
  const [fetched, setFetched] = useState(false);
  const [CampaignRows, setCampaignRows] = useState([]);
  const { loading, campaigns } = useCampaigns(fetched);

  useEffect(() => {
    if (campaigns.length) {
      setFetched(true);
      setCampaignRows(
        campaigns.map(campaign => {
          return (
            <ListGroup.Item
              key={campaign.campaignId}
              onClick={() => { props.setSelectedCampaign(campaign); }}
              className="p-2 d-flex align-items-center">
              <div className="d-inline mr-auto">{campaign.campaignName}</div>
              {user.userRole === 'gm' &&
                <Button
                  disabled={typeof (user.userId) === 'string'}
                  variant="danger"
                  onClick={() => { }}>
                  <i className="far fa-trash-alt" />
                </Button>}
            </ListGroup.Item>
          );
        })
      );
    }
  }, [campaigns]);

  if (loading) {
    return <Loading/>;
  } else if (CampaignRows.length) {
    return (
      <ListGroup className="campaign-list">
        {CampaignRows}
      </ListGroup>
    );
  }

  return <EmptySet/>;
}

function CampaignListFooter(props) {
  const { user } = useContext(AppUser);
  const { updateCampaign } = useContext(Campaign);

  return (
    <>
      <Button variant="outline-success" className="footer-button"
        onClick={() => {}}>
        <i className={`fas ${user.userRole === 'gm' ? 'fa-plus-circle' : 'fa-redo-alt'}`} />
        <p className="button-text m-0">{user.userRole === 'gm' ? 'New' : 'Refresh'}</p>
      </Button>
      {user.userRole === 'gm' &&
        <Button variant="secondary" className="footer-button"
          onClick={() => {}}>
          <i className="fas fa-file-upload" />
          <p className="button-text m-0">Configure</p>
        </Button>}
      <Button variant="success" className="footer-button"
        onClick={() => { updateCampaign(props.selectedCampaign); }}>
        <i className="fas fa-play" />
        <p className="button-text m-0">{user.userRole === 'gm' ? 'Launch' : 'Join'}</p>
      </Button>
    </>
  );
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
