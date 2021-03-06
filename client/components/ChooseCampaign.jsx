import './ChooseCampaign.css';
import React, { useState, useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ContainerCard from '@components/UI/ContainerCard';
import Loading from '@components/UI/Loading';
import NewCampaignModal from '@components/modals/NewCampaignModal';
import { AppUser } from '@client/context/user-context';
import { Campaign } from '@client/context/campaign-context';
import { getCampaigns, deleteCampaign } from '@client/lib/api';

export default function ChooseCampaign() {
  const [selectedCampaign, setSelectedCampaign] = useState({});
  const [openNewCampaignModal, setOpenNewCampaignModal] = useState(false);

  const toggleModal = () => setOpenNewCampaignModal(!openNewCampaignModal);

  const selectRow = (event, campaign) => {
    const tableRows = document.getElementById('campaign-list').children;
    for (let rowIndex = 0; rowIndex < tableRows.length; rowIndex++) {
      tableRows[rowIndex].classList.remove('selected');
    }
    event.target.parentElement.classList.add('selected');
    setSelectedCampaign(campaign);
  };

  return (
    <ContainerCard
      className="align-self-center mx-auto"
      percentHeight={75}
      percentWidth={25}
      bg="#343a40" shadow={true}>
      <div className="campaign-list-container">
        { openNewCampaignModal && <NewCampaignModal addNewCampaign={() => {}} toggleModal={() => { toggleModal(); }}/>}
        <Card className="w-100 h-100 bg-dark border-0">
          <Card.Header>
            <CampaignListHeader/>
          </Card.Header>
          <Card.Body className="p-0 h-100 bg-light mb-2 rounded">
            <CampaignList selectRow={selectRow}/>
          </Card.Body>
          <Card.Footer className="d-flex justify-content-around p-0">
            <CampaignListFooter selectedCampaign={selectedCampaign} toggleModal={() => { toggleModal(); }}/>
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
    if (!loading) setFetched(true);

    if (campaigns.length) {
      setCampaignRows(
        campaigns.map(campaign => {
          return (
            <ListGroup.Item
              key={campaign.campaignId}
              className="p-2 d-flex align-items-center">
              <div className="campaign-name" onClick={() => { props.selectRow(event, campaign); }}>{campaign.campaignName}</div>
              {user.userRole === 'gm' &&
                <Button
                  className="delete-campaign-button"
                  disabled={typeof (user.userId) === 'string'}
                  variant="danger"
                  onClick={() => { deleteCampaign(campaign.campaignId).then(() => setFetched(false)); }}>
                  <i className="far fa-trash-alt" />
                </Button>}
            </ListGroup.Item>
          );
        })
      );
    }
  }, [campaigns, loading]);

  if (loading) {
    return <Loading/>;
  } else if (CampaignRows.length) {
    return (
      <ListGroup id="campaign-list">
        {CampaignRows}
      </ListGroup>
    );
  }

  return <EmptySet refreshList={() => { setFetched(false); }}/>;
}

function CampaignListFooter(props) {
  const { user } = useContext(AppUser);
  const { updateCampaign } = useContext(Campaign);

  return (
    <>
      {user.userRole === 'gm' &&
      <Button variant="outline-success" className="footer-button"
        disabled={user.userRole === 'gm' && (typeof user.userId === 'string')}
        onClick={() => { props.toggleModal(); }}>
        <i className={'fas fa-plus-circle'} />
        <p className="button-text m-0">New</p>
      </Button>}
      <Button variant="success" className="footer-button"
        onClick={() => { updateCampaign(props.selectedCampaign); }}>
        <i className="fas fa-play" />
        <p className="button-text m-0">{user.userRole === 'gm' ? 'Launch' : 'Join'}</p>
      </Button>
    </>
  );
}

function EmptySet(props) {
  const { user } = useContext(AppUser);
  const Text = (user.userRole === 'gm')
    ? <p>Start <span> <i className="fas fa-plus-circle text-success"/></span> a new Campaign</p>
    : (<p>No active Campaign sessions to join.<br/>
        Click <span>
        <Button variant="outline-success"
          onClick={props.refreshList}>
          <i className="fas fa-redo-alt text-success"/>
        </Button>
      </span> to check again!</p>
    );

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
