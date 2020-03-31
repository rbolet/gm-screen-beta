import React from 'react';
import ModalBackground from '@components/modals/ModalBackground';
import ContainerCard from '@components/UI/ContainerCard';
import FeaturedImage from '@components/UI/FeaturedImage';
import Portal from '@components/Portal';
import CloseButton from '@components/UI/CloseButton';
import TokenDetails from '@components/UI/TokenDetails';

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
        <ContainerCard percentHeight={90} percentWidth={75} bg="#343a40" shadow>
          <>
            <CloseButton icon={<i className="far fa-times-circle"/>} onCloseClick={props.closeModal}/>
            <div className="d-flex justify-content-between w-100 h-100">
              <FeaturedImage image={tempImage}/>
              <TokenDetails image={tempImage}/>
            </div>
          </>
        </ContainerCard>
      </ModalBackground>
    </Portal>
  );
}
