import React/*, { useState } */ from 'react';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Portal from '@components/Portal';
import ModalBackground from '@components/modals/ModalBackground';
import CloseButton from '@components/UI/CloseButton';
import ContainerCard from '@components/UI/ContainerCard';

export default function QuickTour(props) {
  // const [page, setPage] = useState(1);
  // const lastPage = 6;
  const headerText = 'Welcome to GM Screen';

  return (
    <Portal>
      <ModalBackground>
        <ContainerCard
          percentHeight={100}
          percentWidth={66}
          bg="#343a40" shadow
          header={
            <>
              <h3 className="rakkas text-center w-100">{headerText}</h3>
              <CloseButton icon={<i className="far fa-times-circle" />}
                onCloseClick={props.closeModal} />
            </>}
        >
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row>
              <Col sm={3}>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link eventKey="gm">GM</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="player">Player</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={9}>
                <Tab.Content>
                  <Tab.Pane eventKey="gm">
                    <p>The GM content goes here</p>
                  </Tab.Pane>
                  <Tab.Pane eventKey="player">
                    <p>The Player content goes here</p>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </ContainerCard>
      </ModalBackground>
    </Portal>
  );
}
