import React from 'react';
import ContainerCard from './ContainerCard';
// import Form from 'react-bootstrap/Form';
// import { AppUser } from '../../context/user-context';

export default function Login() {
  // const [userName, setUserName] = React.useState('');
  // const [password, setPassword] = React.useState('');
  // const { updateUser } = React.useContext(AppUser);

  const ButtonGroup = (
    <div className="menu-box-footer w-100 d-flex justify-content-between px-2">
      <button className="btn btn-outline-light w-25" onClick={() => { }}>
        <i className="fas fa-user-plus" />
        <p className="button-text m-0">New User</p>
      </button>
      <button className="btn btn-success text-light w-25" onClick={() => { }}>
        <i className="fas fa-sign-in-alt" />
        <p className="button-text m-0">Log In</p>
      </button>
    </div>
  );

  return (
    <ContainerCard
      className="align-self-center mx-auto"
      percentHeight={75}
      percentWidth={25}
      bg="#343a40" shadow={true}
      footer={ButtonGroup}>

    </ContainerCard>
  );
}

// const RealForm = (
//   <Form>
//     <Form.Group controlId="userName">
//       <Form.Label className="text-light">User Name</Form.Label>
//       <Form.Control type="text" placeholder="Enter user name" value={userName} onChange={event => { setUserName(event.target.value); }} />
//     </Form.Group>
//     <Form.Group controlId="password">
//       <Form.Label className="text-light">Password</Form.Label>
//       <Form.Control type="password" placeholder="Password" value={password} onChange={event => { setPassword(event.target.value); }} />
//     </Form.Group>
//   </Form>
// );
