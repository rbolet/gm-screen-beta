import React, { useState, useContext, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Body from '@components/UI/Body';
import ContainerCard from '@components/UI/ContainerCard';
import ImageGrid from '@components/UI/ImageGrid';
import MainDisplay from '@components/MainDisplay';
import TokenModal from '@components/modals/TokenModal';
import CloseButton from '@components/UI/CloseButton';
import { TokenContext } from '@client/context/token-context';
import { Session } from '@client/context/session-context';

export default function GMView(props) {
  const { session, postSession } = useContext(Session);

  const [selectedImage, setSelectedImage] = useState(null);
  const [openTokenModal, setOpenTokenModal] = useState(false);
  const [selectedToken, setSelectedToken] = useState(null);

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

  const editToken = token => {
    setSelectedToken(token);
    setOpenTokenModal(true);
  };

  return (
    <TokenContext>
      <Body>
        {openTokenModal &&
          <TokenModal closeModal={() => { setOpenTokenModal(false); setSelectedImage(null); }}
            image={selectedImage} token={selectedToken}/>}
        <ContainerCard percentHeight={100} percentWidth={66} bg="#343a40" shadow>
          <CloseButton onCloseClick={() => {
            postSession({ environmentImage: { fileName: null, category: 'Environment' } });
          }}
          icon={<i className="far fa-times-circle" />} />
          <MainDisplay editToken={editToken}/>
        </ContainerCard>
        <ContainerCard percentHeight={100} percentWidth={32} bg="#343a40"shadow={true}
          footer={
            <div className="d-flex justify-content-center">
              <Button variant="secondary" className="footer-button"
                onClick={() => { }}>
                <div className="row no-gutters">
                  <p className="button-text text-light mr-2 my-0">Upload Images</p>
                  <i className="fas fa-file-upload" />
                </div>

              </Button>
            </div>
          }>
          <ImageGrid onImageClick={setSelectedImage}/>
        </ContainerCard>
      </Body>
    </TokenContext>
  );
}
