import React, { useState, useEffect, useContext } from 'react';
import './SelectVisibleTo.css';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import { Campaign } from '@client/context/campaign-context';
import { Token } from '@client/context/token-context';

export default function SelectVisibleTo() {
  const { campaign } = useContext(Campaign);
  const { token, updateToken } = useContext(Token);
  const [ToggleButtons, setToggleButtons] = useState(null);
  // const [all, setAll] = useState(true);

  useEffect(() => {
    const players = campaign.roomUserList.filter(user => user.userRole === 'player');

    if (players.length) {
      setToggleButtons(players.map(user => {
        return (
          <ToggleButton size="sm" key={user.userId} value={user.userId} className="text-dark"
            variant="outline-info" disabled={token.hidden}>{user.userName}</ToggleButton>
        );
      }));
    }
  }, [campaign.roomUserList]);

  // const toggleAll = () => {
  //   setAll(!all);
  // };

  return (
    <ButtonToolbar className="visible-toolbar">
      <ButtonGroup>
        <ToggleButtonGroup type="checkbox" onChange={() => { }}>
          {ToggleButtons}
        </ToggleButtonGroup>
        <Button variant="outline-info" active={token.hidden} size="sm"
          style={{ width: '50px' }}
          onClick={() => { updateToken({ hidden: !token.hidden }); }}>
          {token.hidden
            ? <i className="far fa-eye" />
            : <i className="far fa-eye-slash" />}
        </Button>
      </ButtonGroup>
    </ButtonToolbar>
  );
}
