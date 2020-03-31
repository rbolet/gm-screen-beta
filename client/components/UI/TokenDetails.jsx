import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';

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
      <Form.Row>
        <Form.Group>
          <label>Name</label>
          <input type="input" value={tokenName} onChange={event => { setTokenName(event.target.value); }} />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group >
          <Form.Label>Details</Form.Label>
          <Form.Control type="text-area" value={tokenDetails} onChange={event => { setTokenDetails(event.target.value); }}/>
        </Form.Group>
      </Form.Row>
    </Form>
  );
}
