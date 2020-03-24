import './Chat.css';
import React, { } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export default function Chat(props) {

  return (
    <Accordion>
      <Card className="chat">
        <Accordion.Collapse eventKey="0">
          <Card.Body>Chat Window Goes Here</Card.Body>
        </Accordion.Collapse>
        <Card.Footer className="chat-footer">
          <Accordion.Toggle as={Button} variant="" eventKey="0">
            ^
          </Accordion.Toggle>
        </Card.Footer>
      </Card>
    </Accordion>
  );
}
