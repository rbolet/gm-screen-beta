import React, { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import ContainerCard from '@components/UI/ContainerCard';
import ImageGrid from '@components/UI/ImageGrid';
import UploadForm from '@components/UI/UploadForm';
import FeaturedImage from '@components/UI/FeaturedImage';
import { Session } from '@client/context/session-context';

export default function CampaignConfig(props) {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <>
      <ContainerCard
        percentHeight={100}
        percentWidth={66}
        bg="#343a40" shadow
        footer={<UploadForm/>}>
        <ImageGrid onImageClick={setSelectedImage}/>
      </ContainerCard>
      <ContainerCard
        percentHeight={100}
        percentWidth={33}
        bg="#343a40" shadow
        footer={<LaunchSession/>}>
        <FeaturedImage image={selectedImage}/>
      </ContainerCard>
    </>
  );
}

function LaunchSession() {
  const { updateSession } = useContext(Session);

  return (
    <div className="w-100 d-flex justify-content-center">
      <Button variant="success" onClick={() => { updateSession(); }}>Launch Session</Button>
    </div>
  );
}
