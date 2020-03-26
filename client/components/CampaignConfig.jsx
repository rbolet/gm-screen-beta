import React from 'react';
import ContainerCard from '@components/UI/ContainerCard';
import ImageGrid from '@components/UI/ImageGrid';
import UploadForm from '@components/UI/UploadForm';

export default function CampaignConfig(props) {

  return (
    <>
      <ContainerCard
        percentHeight={100}
        percentWidth={50}
        bg="#343a40" shadow={true}
        footer={<UploadForm/>}>
        <ImageGrid/>
      </ContainerCard>
    </>
  );
}
