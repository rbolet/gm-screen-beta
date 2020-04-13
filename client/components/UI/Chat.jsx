import './Chat.css';
import React, { useContext } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import { Campaign } from '@client/context/campaign-context';

export default function Chat(props) {
  const { campaign } = useContext(Campaign);

  return (

    <Accordion className="chat">

      <Card className="chat-card bg-dark">
        <div className="border-div">
          <Accordion.Toggle as={Card.Header} variant="secondary" eventKey="0" className="text-light text-center">
            <em>{campaign.room === 'Lobby' ? 'Lobby' : campaign.campaignName}</em>
          </Accordion.Toggle>
        </div>
        <Accordion.Collapse eventKey="0">
          <Card.Body className="p-2 d-flex">
            <UserList/>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>

  );
}

function UserList(props) {
  const { campaign } = useContext(Campaign);

  let RoomUserList = null;
  if (campaign.roomUserList.length) {
    RoomUserList = campaign.roomUserList.map(user => {
      let colorClass = 'text-dark'; let roleIcon = null;
      switch (user.userRole) {
        case 'gm':
          colorClass = 'text-danger';
          roleIcon = <i className="fas fa-hat-wizard text-danger" />;
          break;
        case 'player':
          colorClass = 'text-info';
          roleIcon = <i className="fas fa-dice text-info" />;
      }
      return (
        <div key={user.userId} className={`chat-user-name ${colorClass}`}>
          <span>{roleIcon}</span>{`  ${user.userName}`}</div>
      );
    });
  }
  return (
    <div className="chat-user-list">
      {RoomUserList}
    </div>

  );
}
