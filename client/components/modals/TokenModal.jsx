import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ModalBackground from '@components/modals/ModalBackground';
import ContainerCard from '@components/UI/ContainerCard';
import FeaturedImage from '@components/UI/FeaturedImage';
import Portal from '@components/Portal';
import CloseButton from '@components/UI/CloseButton';
import TokenDetails from '@components/UI/TokenDetails';
import { AppUser } from '@client/context/user-context';

const tempImage = {
  imageId: 5,
  fileName: '0c00a350-dfbb-4d8f-98af-e0815bbdaefb..png',
  category: 'Secondary',
  alias: 'Elf'
};

export default function TokenModal(props) {
  const { user } = useContext(AppUser);
  const isGM = user.userRole === 'gm';

  return (
    <Portal>
      <ModalBackground>
        <ContainerCard percentHeight={90} percentWidth={75} bg="#343a40" shadow>
          <CloseButton icon={<i className="far fa-times-circle"/>} onCloseClick={props.closeModal}/>
          <div className="w-100 h-100 d-flex justify-content-around align-items-center">
            <ContainerCard percentWidth={65} percentHeight={100}>
              <FeaturedImage image={tempImage}/>
            </ContainerCard>
            <ContainerCard percentWidth={32} percentHeight={90} bg="#6c757d"
              footer={isGM && <GMButtons/>}>
              <TokenDetails image={tempImage}/>
            </ContainerCard>
          </div>
        </ContainerCard>
      </ModalBackground>
    </Portal>
  );
}

function GMButtons() {
  return (
    <>
      <ButtonGroup>
        <Button>Player 1</Button>
        <Button>Player 2</Button>
        <Button>Player 3</Button>
        <Button>Player 4</Button>
      </ButtonGroup>
      <Button variant="success">
        <i className="far fa-edit" />
        <p className="button-text m-0">Update Details</p>
      </Button>
    </>
  );
}
