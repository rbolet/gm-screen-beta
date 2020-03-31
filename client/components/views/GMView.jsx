import React, { useState, useContext, useEffect } from 'react';
import Body from '@components/UI/Body';
import ContainerCard from '@components/UI/ContainerCard';
import ImageGrid from '@components/UI/ImageGrid';
import MainDisplay from '@components/UI/MainDisplay';
import TokenModal from '@components/modals/TokenModal';
import { Session } from '@client/context/session-context';

export default function GMView(props) {
  const { session, postSession } = useContext(Session);
  const [selectedImage, setSelectedImage] = useState(null);
  const [openTokenModal, setOpenTokenModal] = useState(false);

  useEffect(() => {
    if (!session.environmentImageFileName) setSelectedImage(null);
  }, [session.environmentImageFileName]);

  useEffect(() => {
    if (selectedImage) {
      switch (selectedImage.category) {
        case 'Environment':
          postSession({ environmentImage: selectedImage });
          break;
        case 'Secondary':
          setOpenTokenModal(true);
      }
    }
  }, [selectedImage]);

  return (
    <Body>
      {openTokenModal && <TokenModal/>}
      <ContainerCard percentHeight={100} percentWidth={66} bg="#343a40" shadow={true}>
        <MainDisplay/>
      </ContainerCard>
      <ContainerCard percentHeight={100} percentWidth={32} bg="#343a40"shadow={true}>
        <ImageGrid onImageClick={setSelectedImage}/>
      </ContainerCard>
    </Body>
  );
}
