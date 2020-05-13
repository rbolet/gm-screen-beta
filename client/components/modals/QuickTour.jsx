import React/*, { useState } */ from 'react';
import './QuickTour.css';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import Portal from '@components/Portal';
import ModalBackground from '@components/modals/ModalBackground';
import CloseButton from '@components/UI/CloseButton';
import ContainerCard from '@components/UI/ContainerCard';

export default function QuickTour(props) {

  const headerText = 'Welcome to GM Screen';

  return (
    <Portal>
      <ModalBackground>
        <ContainerCard
          percentHeight={98}
          percentWidth={66}
          bg="#6c757d" shadow
          header={
            <>
              <h3 className="rakkas text-center w-100">{headerText}</h3>
              <CloseButton icon={<i className="far fa-times-circle" />}
                onCloseClick={props.closeModal} />
            </>}
        >
          <Tab.Container id="roles" defaultActiveKey="overview">
            <Row className="no-gutters">
              <Nav variant="pills">
                <Nav.Item>
                  <Nav.Link className="text-light" eventKey="overview">Overview</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link className="text-light" eventKey="gm">GM</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link className="text-light" eventKey="player">Player</Nav.Link>
                </Nav.Item>
              </Nav>
            </Row>
            <Row className="no-gutters">
              <Tab.Content>
                <Tab.Pane eventKey="gm">
                  <GM/>
                </Tab.Pane>
                <Tab.Pane eventKey="player">
                  <Player/>
                </Tab.Pane>
                <Tab.Pane eventKey="overview">
                  <Overview/>
                </Tab.Pane>
              </Tab.Content>
            </Row>
          </Tab.Container>
        </ContainerCard>
      </ModalBackground>
    </Portal>
  );
}

function Overview() {
  return (
    <p><span className="indent"/>GM-Screen is not a game. It is an application to supplement the storytelling and enhance
    the immersion of traditional paper-and-dice role playing games,
    allowing Game Masters to share images in real time with the rest of the player group.
    Since GM-Screen does not use any game mechanics, it is useable with any system, game,
    or any situation imaginable where visual aids can add to a group&apos;s shared experience.</p>
  );
}

function GM() {
  return (
    <p>GM Content</p>
  );
}

function Player() {
  return (
    <p>Player Content</p>
  );
}
