import React from 'react';
import ModalBackground from '@components/modals/ModalBackground';
import ContainerCard from '@components/UI/ContainerCard';
import FeaturedImage from '@components/UI/FeaturedImage';

const tempImage = {
  imageId: 5,
  fileName: '0c00a350-dfbb-4d8f-98af-e0815bbdaefb..png',
  category: 'Secondary',
  alias: 'Elf'
};

export default function TokenModal() {
  return (
    <ModalBackground>
      <ContainerCard percentHeight={90} percentWidth={50} shadow={true}>
        <FeaturedImage image={tempImage}/>
      </ContainerCard>
    </ModalBackground>
  );
}
