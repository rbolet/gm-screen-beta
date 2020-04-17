import './Chat.css';
import React, { useContext, useState, useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Loading from '@components/UI/Loading';
import { Campaign } from '@client/context/campaign-context';

export default function Chat(props) {
  const { campaign } = useContext(Campaign);
  const [ChatHeader, setChatHeader] = useState(<Loading/>);
  const [Messages, setMessages] = useState(props.infoMessages);

  useEffect(() => {
    if (campaign.campaignName) {
      setChatHeader(<em>{campaign.campaignName}</em>);
    } else if (campaign.room === 'Lobby') {
      setChatHeader(<em>Lobby</em>);
    } else {
      setChatHeader(<Loading/>);
    }
  }, [campaign.room, campaign.campaignName]);

  useEffect(() => {
    if (props.infoMessages) {
      setMessages(
        [props.infoMessages].reverse().map((message, i) => {
          return (
            <p key={i} className="mb-1 mr-auto">{message}</p>
          );
        })
      );
    }
  }, [props.infoMessages]);

  return (

    <Accordion className="chat">
      <Card className="chat-card bg-dark">
        <Accordion.Toggle as={Card.Header} variant="secondary" eventKey="0" className="text-light text-center border border-white">
          {ChatHeader}
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <Card.Body className="p-2 d-flex">
            <MessageArea>
              {Messages}
            </MessageArea>
            <UserList/>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>

  );
}

function MessageArea(props) {

  return (
    <div className="chat-messages">{props.children}</div>
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
