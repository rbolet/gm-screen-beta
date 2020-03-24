import './Chat.css';
import React, { useContext } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Session } from '@client/context/session-context';

export default function Chat(props) {

  return (

    <Accordion className="chat">
      <Card className="chat-card bg-dark">
        <Accordion.Collapse eventKey="0">
          <Card.Body className="p-2 d-flex">
            <div className="chat-messages"></div>
            <UserList/>
          </Card.Body>
        </Accordion.Collapse>
        <Card.Footer className="chat-footer">
          <Accordion.Toggle as={Button} variant="secondary" eventKey="0">
              v
          </Accordion.Toggle>
        </Card.Footer>
      </Card>
    </Accordion>

  );
}

function UserList(props) {
  const { session } = useContext(Session);

  let RoomUserList = null;
  if (session.roomUserList.length) {
    RoomUserList = session.roomUserList.map(user => {
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

// function ChatMessages(props) {
//   const { session } = useContext(Session);

// }
