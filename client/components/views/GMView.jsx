import React, { useState, useContext, useEffect } from 'react';
import Body from '@components/UI/Body';
import ContainerCard from '@components/UI/ContainerCard';
import ImageGrid from '@components/UI/ImageGrid';
import { Session } from '@client/context/session-context';

export default function GMView(props) {
  const { session, updateSession } = useContext(Session);
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
        <Environment backgroundImage={session.environmentImageFileName}/>
      </ContainerCard>
      <ContainerCard percentHeight={100} percentWidth={32} bg="#343a40"shadow={true}>
        <ImageGrid onImageClick={setSelectedImage}/>
      </ContainerCard>
    </Body>
  );
}

function Environment(props) {
  return (
    <div className="environment-image h-100 w-100" style={{ backgroundImage: `url(./images/${props.backgroundImage})`, objectFit: 'contain' }}/>
  );
}
