import React from 'react';
import ModalBackground from '@components/modals/ModalBackground';
import ContainerCard from '@components/UI/ContainerCard';
import FeaturedImage from '@components/UI/FeaturedImage';
import Portal from '@components/Portal';
import CloseButton from '@components/UI/CloseButton';

const tempImage = {
  imageId: 5,
  fileName: '0c00a350-dfbb-4d8f-98af-e0815bbdaefb..png',
  category: 'Secondary',
  alias: 'Elf'
};

export default function TokenModal(props) {
  return (
    <Portal>
      <ModalBackground>
        <ContainerCard percentHeight={90} percentWidth={50} bg="#343a40" shadow>
          <>
            <CloseButton icon={<i className="far fa-times-circle"/>} onCloseClick={props.closeModal}/>
            <FeaturedImage image={tempImage}/>
          </>
        </ContainerCard>
      </ModalBackground>
    </Portal>
  );
}
