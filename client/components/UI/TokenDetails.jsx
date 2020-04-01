import './TokenDetails.css';
import React, { useState, useEffect, useContext } from 'react';
import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
import { AppUser } from '@client/context/user-context';

export default function TokenDetails(props) {
  const { user } = useContext(AppUser);
  const [tokenName, setTokenName] = useState(null);
  const [tokenDetails, setTokenDetails] = useState(null);

  const isPlayer = user.userRole === 'player';

  useEffect(() => {
    if (props.image) {
      setTokenName(props.image.alias);
    }
  }, []);

  return (
    <div className="h-100 w-100 d-flex flex-column justify-content-center align-items-center p-2">
      <Form className="w-100">
        <Form.Group controlId="tokenName">
          <Form.Label className="text-light">Name</Form.Label>
          <Form.Control type="text"
            readOnly={isPlayer}
            value={tokenName}
            onChange={event => setTokenName(event.target.value)} />
        </Form.Group>
        <Form.Group controlId="tokenDetails">
          <Form.Label className="text-light">Details</Form.Label>
          <Form.Control className="details-text-area"
            as="textarea" rows="6"
            readOnly={isPlayer}
            value={tokenDetails}
            onChange={event => setTokenDetails(event.target.value)} />
        </Form.Group>
      </Form>
    </div>
  );
}
