import './TokenDetails.css';
import React, { useContext, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Token } from '@client/context/token-context';
import { AppUser } from '@client/context/user-context';
import { Session } from '@client/context/session-context';
import { postToken, deleteToken } from '@client/lib/api';

export default function TokenDetails(props) {
  const { user } = useContext(AppUser);
  const { token, updateToken } = useContext(Token);
  const { session } = useContext(Session);

  const [formName, setFormName] = useState(token.tokenName);
  const [formDetails, setFormDetails] = useState(token.tokenDetails);

  const isPlayer = user.userRole === 'player';

  const buttonText = (token.tokenId === 'new') ? 'Add token' : 'Update details';
  return (
    <div className="h-100 w-100 d-flex flex-column justify-content-center align-items-center p-2">
      <Form className="w-100">
        <Form.Group controlId="tokenName">
          <Form.Label className="text-light">Name</Form.Label>
          <Form.Control type="text"
            readOnly={isPlayer}
            value={formName}
            onChange={event => setFormName(event.target.value)} />
        </Form.Group>
        <Form.Group controlId="tokenDetails">
          <Form.Label className="text-light">Details</Form.Label>
          <Form.Control className="details-text-area"
            as="textarea" rows="6"
            readOnly={isPlayer}
            value={formDetails}
            onChange={event => setFormDetails(event.target.value)} />
        </Form.Group>
      </Form>
      <div className="row">
        <Button variant="success" className="mt-1 mr-2"
          onClick={() => {
            updateToken({ tokenName: formName, tokenDetails: formDetails })
              .then(done => { postToken(token, session.sessionId); })
              .catch(err => { console.error(err); });
          }}>
          <i className="far fa-edit" />
          <p className="button-text m-0">{buttonText}</p>
        </Button>
        {token.tokenId !== 'new' &&
          <Button variant="danger"
            onClick={() => {
              deleteToken(token, session.sessionId)
                .then(p => {
                  updateToken('clear');
                })
                .catch(err => console.error(err));
            }}>
            <i className="fas fa-trash-alt"/>
            <p className="button-text m-0">Remove Token</p>
          </Button>}
      </div>
    </div>
  );
}
