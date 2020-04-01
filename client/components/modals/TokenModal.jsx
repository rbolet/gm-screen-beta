import React, { useContext, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import ModalBackground from '@components/modals/ModalBackground';
import ContainerCard from '@components/UI/ContainerCard';
import FeaturedImage from '@components/UI/FeaturedImage';
import Portal from '@components/Portal';
import CloseButton from '@components/UI/CloseButton';
import TokenDetails from '@components/UI/TokenDetails';
import SelectVisibleTo from '@components/UI/SelectVisibleTo';
import { AppUser } from '@client/context/user-context';
import { Token } from '@client/context/token-context';
import { postToken } from '@client/lib/api';

export default function TokenModal(props) {
  const { token, updateToken } = useContext(Token);
  const { user } = useContext(AppUser);

  useEffect(() => {
    updateToken(props.image, true);
  }, [props.image]);

  const isGM = user.userRole === 'gm';

  return (
    <Portal>
      <ModalBackground>
        <ContainerCard percentHeight={90} percentWidth={75} bg="#343a40" shadow>
          <CloseButton icon={<i className="far fa-times-circle"/>} onCloseClick={props.closeModal}/>
          <div className="w-100 h-100 d-flex justify-content-around align-items-center">
            <ContainerCard percentWidth={49} percentHeight={100}
              header={isGM && <SelectVisibleTo />}>
              <FeaturedImage image={{ fileName: token.imageFileName }}/>
            </ContainerCard>
            <ContainerCard percentWidth={49} percentHeight={90} bg="#6c757d"
              footer={isGM &&
                <UpdateToken update={() => { postToken(token); props.closeModal(); }}/>}>
              <TokenDetails/>
            </ContainerCard>
          </div>
        </ContainerCard>
      </ModalBackground>
    </Portal>
  );
}

function UpdateToken(props) {
  return (
    <div className="w-100 d-flex justify-content-center">
      <Button variant="success" className="mt-1"
        onClick={props.update()}>
        <i className="far fa-edit" />
        <p className="button-text m-0">Update Details</p>
      </Button>
    </div>
  );
}
