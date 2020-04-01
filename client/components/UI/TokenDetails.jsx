import './TokenDetails.css';
import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function TokenDetails(props) {
  const [tokenName, setTokenName] = useState(null);
  const [tokenDetails, setTokenDetails] = useState(null);

  useEffect(() => {
    if (props.image) {
      setTokenName(props.image.alias);
    }
  }, []);

  return (
    <Form>
      <Form.Label>Name</Form.Label>
      <Form.Row>
        <Form.Control type="input" value={tokenName} onChange={event => { setTokenName(event.target.value); }}/>
        <Button>E</Button>
      </Form.Row>
      <Form.Row>
        <Form.Group >
          <Form.Label>Details</Form.Label>
          <Form.Control type="text-area" value={tokenDetails}
            onChange={event => { setTokenDetails(event.target.value); }}
            className="details-text-area"/>
        </Form.Group>
      </Form.Row>
    </Form>
  );
}
