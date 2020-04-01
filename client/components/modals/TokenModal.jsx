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
          <CloseButton icon={<i className="far fa-times-circle"/>} onCloseClick={props.closeModal}/>
          <div className="w-100 h-100 d-flex justify-content-around align-items-center">
            <ContainerCard percentWidth={65} percentHeight={100}>
              <FeaturedImage image={tempImage}/>
            </ContainerCard>
            <ContainerCard percentWidth={32} percentHeight={90} bg="#6c757d">
              <TokenDetails image={tempImage}/>
            </ContainerCard>
          </div>
        </ContainerCard>
      </ModalBackground>
    </Portal>
  );
}
