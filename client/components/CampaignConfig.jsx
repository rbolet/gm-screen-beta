import React, { useState } from 'react';
import ContainerCard from '@components/UI/ContainerCard';
import ImageGrid from '@components/UI/ImageGrid';
import UploadForm from '@components/UI/UploadForm';
import FeaturedImage from '@components/UI/FeaturedImage';

export default function CampaignConfig(props) {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <>
      <ContainerCard
        percentHeight={100}
        percentWidth={66}
        bg="#343a40" shadow={true}
        footer={<UploadForm/>}>
        <ImageGrid onImageClick={setSelectedImage}/>
      </ContainerCard>
      <ContainerCard
        percentHeight={100}
        percentWidth={33}
        bg="#343a40" shadow={true}>
        <FeaturedImage image={selectedImage}/>
      </ContainerCard>
    </>
  );
}
