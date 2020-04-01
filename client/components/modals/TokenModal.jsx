import React, { useContext } from 'react';
import ModalBackground from '@components/modals/ModalBackground';
import ContainerCard from '@components/UI/ContainerCard';
import FeaturedImage from '@components/UI/FeaturedImage';
import Portal from '@components/Portal';
import CloseButton from '@components/UI/CloseButton';
import TokenDetails from '@components/UI/TokenDetails';
import SelectVisibleTo from '@components/UI/SelectVisibleTo';
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
            <ContainerCard percentWidth={49} percentHeight={100}>
              <FeaturedImage image={tempImage}/>
            </ContainerCard>
            <ContainerCard percentWidth={49} percentHeight={90} bg="#6c757d"
              footer={isGM && <SelectVisibleTo/>}>
              <TokenDetails image={tempImage}/>
            </ContainerCard>
          </div>
        </ContainerCard>
      </ModalBackground>
    </Portal>
  );
}
