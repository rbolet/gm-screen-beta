import React, { useState, useContext } from 'react';
import ContainerCard from '@components/UI/ContainerCard';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { createRandomGuest } from '@client/lib/guest-users';
import { AppUser } from '@client/context/user-context';

export default function Login(props) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const { updateUser } = useContext(AppUser);

  const ButtonGroup = (
    <div className="d-flex justify-content-around">
      <Button variant="danger"
        onClick={() => { updateUser(createRandomGuest('gm')); }}>Guest GM</Button>
      <Button variant="info"
        onClick={() => { updateUser(createRandomGuest('player')); }}>Guest Player</Button>
    </div>
  );

  return (
    <ContainerCard
      className="align-self-center mx-auto"
      percentHeight={75}
      percentWidth={25}
      bg="#343a40" shadow={true}
      footer={ButtonGroup}
      header={<div className="login-message text-light mb-3 text-center">Login disabled for demonstration purposes</div>}>
      <Form>
        <Form.Group controlId="userName">
          <Form.Label className="text-light">User Name</Form.Label>
          <Form.Control disabled type="text" placeholder="Enter user name" value={userName} onChange={event => { setUserName(event.target.value); }} />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label className="text-light">Password</Form.Label>
          <Form.Control disabled type="password" placeholder="Password" value={password} onChange={event => { setPassword(event.target.value); }} />
        </Form.Group>
      </Form>
    </ContainerCard>
  );
}

// const RealButtonGroup = (
//   <div className="menu-box-footer w-100 d-flex justify-content-between px-2">
//     <button className="btn btn-outline-light w-25" onClick={() => { }}>
//       <i className="fas fa-user-plus" />
//       <p className="button-text m-0">New User</p>
//     </button>
//     <button className="btn btn-success text-light w-25" onClick={() => { }}>
//       <i className="fas fa-sign-in-alt" />
//       <p className="button-text m-0">Log In</p>
//     </button>
//   </div>
// );
