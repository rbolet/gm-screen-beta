import './Chat.css';
import React, { } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export default function Chat(props) {

  return (

    <Accordion className="chat">
      <Card className="chat-card bg-dark">
        <Accordion.Collapse eventKey="0">
          <Card.Body className="p-1">
            <div className="chat-messages"></div>
            <div className="chat-user-list"></div>
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
