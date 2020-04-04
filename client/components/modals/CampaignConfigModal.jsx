import React from 'react';
import ModalBackground from '@components/modals/ModalBackground';
import Portal from '@components/Portal';
import ContainerCard from '@components/UI/ContainerCard';
import ImageGrid from '@components/UI/ImageGrid';
import UploadForm from '@components/UI/UploadForm';
import CloseButton from '@components/UI/CloseButton';

export default function CampaignConfigModal(props) {
  return (
    <Portal>
      <ModalBackground>
        <ContainerCard
          percentHeight={100}
          percentWidth={66}
          bg="#343a40" shadow
          header={<CloseButton icon={<i className="far fa-times-circle" />} onCloseClick={props.closeModal} />}
          footer={<UploadForm />}>
          <ImageGrid/>
        </ContainerCard>
      </ModalBackground>
    </Portal>
  );
}
