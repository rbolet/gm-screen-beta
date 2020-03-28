import React, { useState, useContext, useEffect } from 'react';
import Body from '@components/UI/Body';
import ContainerCard from '@components/UI/ContainerCard';
import ImageGrid from '@components/UI/ImageGrid';
import MainDisplay from '@components/UI/MainDisplay';
import { Session } from '@client/context/session-context';

export default function GMView(props) {
  const { updateSession } = useContext(Session);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (!selectedImage) return;
    switch (selectedImage.category) {
      case 'Environment':
        updateSession({ environmentImageFileName: selectedImage.fileName });
    }
  }, [selectedImage]);

  return (
    <Body>
      <ContainerCard percentHeight={100} percentWidth={66} bg="#343a40" shadow={true}>
        <MainDisplay/>
      </ContainerCard>
      <ContainerCard percentHeight={100} percentWidth={32} bg="#343a40"shadow={true}>
        <ImageGrid onImageClick={setSelectedImage}/>
      </ContainerCard>
    </Body>
  );
}
