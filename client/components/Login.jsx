import React, { useState, useEffect, useContext } from 'react';
import ContainerCard from '@components/UI/ContainerCard';
import Loading from '@components/UI/Loading';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import { createRandomGuest } from '@client/lib/guest-users';
import { AppUser } from '@client/context/user-context';

export default function Login(props) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const { user, updateUser } = useContext(AppUser);

  const LoginForm = (
    <Form style={{ opacity: 0.35 }}>
      <Form.Group controlId="userName">
        <Form.Label className="text-light">User Name</Form.Label>
        <Form.Control disabled type="text" placeholder="Enter user name" value={userName} onChange={event => { setUserName(event.target.value); }} />
      </Form.Group>
      <Form.Group controlId="password">
        <Form.Label className="text-light">Password</Form.Label>
        <Form.Control disabled type="password" placeholder="Password" value={password} onChange={event => { setPassword(event.target.value); }} />
      </Form.Group>
    </Form>
  );

  const Connecting = (
    <div className="d-flex justify-content-center text-light">
      <Loading>
        <h5 className='mr-2'>Connecting ...</h5>
      </Loading>
    </div>
  );

  const [Body, setBody] = useState(LoginForm);
  useEffect(() => {
    if (user.userId && !user.socketId) {
      setBody(Connecting);
    }
  }, [user.userId, user.socketId]);

  const GuestButtonGroup = (
    <div className="d-flex justify-content-around">
      <Button variant="danger"
        onClick={() => { updateUser(createRandomGuest('gm')); }}>Guest GM</Button>
      <DropdownButton id="guest-player-dropdown" variant="info" title="Guest Player">
        <Dropdown.Item onSelect={() => { updateUser(createRandomGuest('player', 1)); }}>Sam (Guest)</Dropdown.Item>
        <Dropdown.Item onSelect={() => { updateUser(createRandomGuest('player', 2)); }}>Max (Guest)</Dropdown.Item>
      </DropdownButton>
    </div>
  );

  return (
    <ContainerCard
      className="align-self-center mx-auto"
      percentHeight={75}
      percentWidth={25}
      bg="#343a40" shadow={true}
      footer={GuestButtonGroup}
      header={<div className="login-message text-light mb-3 text-center">Login disabled for demonstration purposes</div>}>
      {Body}
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
