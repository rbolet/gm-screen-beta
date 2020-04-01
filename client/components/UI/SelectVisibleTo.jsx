import React, { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import { Campaign } from '@client/context/campaign-context';

export default function SelectVisibleTo() {
  const { campaign } = useContext(Campaign);
  const [all, setAll] = useState(true);

  const players = campaign.roomUserList.filter(user => user.userRole === 'player');
  let ToggleButtons = null;
  if (players.length) {
    ToggleButtons = players.map(user => {
      return (
        <ToggleButton key={user.userId} value={user.userId}
          variant="outline-warning">{user.userName}</ToggleButton>
      );
    });
  }
  const toggleAll = () => {
    setAll(!all);
  };

  return (
    <ButtonToolbar className="w-100 d-flex justify-content-center">
      <ButtonGroup>
        <ToggleButtonGroup type="checkbox" onChange={() => { }}>
          {ToggleButtons}
        </ToggleButtonGroup>
        <Button variant="outline-warning"
          style={{ width: '50px' }}
          onClick={toggleAll}>
          {all
            ? <i className="far fa-eye" />
            : <i className="far fa-eye-slash" />}
        </Button>
      </ButtonGroup>
      <Button variant="success" className="mt-1">
        <i className="far fa-edit" />
        <p className="button-text m-0">Update Details</p>
      </Button>
    </ButtonToolbar>
  );
}
