import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

export default function SelectVisibleTo() {
  const [all, setAll] = useState(true);

  const toggleAll = () => {
    setAll(!all);
  };

  return (
    <ButtonToolbar className="w-100 d-flex justify-content-center">
      <ButtonGroup>
        <ToggleButtonGroup type="checkbox" onChange={() => { }}>
          <ToggleButton variant="outline-warning" value={1}>Player 1</ToggleButton>
          <ToggleButton variant="outline-warning" value={2}>Player 2</ToggleButton>
          <ToggleButton variant="outline-warning" value={3}>Player 3</ToggleButton>
          <ToggleButton variant="outline-warning" value={4}>Player 4</ToggleButton>
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
