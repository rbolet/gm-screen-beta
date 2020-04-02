import './TokenDetails.css';
import React, { useContext, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Token } from '@client/context/token-context';
import { AppUser } from '@client/context/user-context';
import { Session } from '@client/context/session-context';
import { postToken } from '@client/lib/api';

export default function TokenDetails(props) {
  const { user } = useContext(AppUser);
  const { token, updateToken } = useContext(Token);
  const { session } = useContext(Session);

  const [tokenName, setTokenName] = useState(token.tokenName);
  const [tokenDetails, setTokenDetails] = useState(token.tokenDetails);

  const isPlayer = user.userRole === 'player';

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
      <div className="row">
        <Button variant="success" className="mt-1 mr-2"
          onClick={() => {
            updateToken({ tokenName, tokenDetails })
              .then(p => postToken(token, session.sessionId))
              .then(p => {
                updateToken('clear');
                props.closeModal();
              });
          }}>
          <i className="far fa-edit" />
          <p className="button-text m-0">Update Details</p>
        </Button>
        {(typeof token.tokenId === 'number') && <Button variant="danger">
          <i className="fas fa-trash-alt"/>
          <p className="button-text m-0">Remove Token</p>
        </Button>}
      </div>
    </div>
  );
}
