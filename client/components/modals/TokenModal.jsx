import React, { useContext, useEffect } from 'react';
import ModalBackground from '@components/modals/ModalBackground';
import ContainerCard from '@components/UI/ContainerCard';
import FeaturedImage from '@components/UI/FeaturedImage';
import Portal from '@components/Portal';
import CloseButton from '@components/UI/CloseButton';
import TokenDetails from '@components/UI/TokenDetails';
import SelectVisibleTo from '@components/UI/SelectVisibleTo';
import Loading from '@components/UI/Loading';
import { AppUser } from '@client/context/user-context';
import { Token } from '@client/context/token-context';

export default function TokenModal(props) {
  const { token, loading, updateToken } = useContext(Token);
  const { user } = useContext(AppUser);

  useEffect(() => {
    if (props.image) updateToken(props.image, true);
    if (props.token) updateToken(props.token);
  }, [props.image, props.token]);

  const isGM = user.userRole === 'gm';

  let Body = (
    <div className="w-100 h-100 d-flex justify-content-around align-items-center">
      <ContainerCard percentWidth={49} percentHeight={100}
        header={isGM && <SelectVisibleTo />}>
        <FeaturedImage image={{ fileName: token.imageFileName }} />
      </ContainerCard>
      <ContainerCard percentWidth={49} percentHeight={90} bg="#6c757d">
        <TokenDetails closeModal={props.closeModal}/>
      </ContainerCard>
    </div >
  );

  useEffect(() => {
    if (loading) Body = <Loading/>;
  }, [loading]);

  return (
    <Portal>
      <ModalBackground>
        <ContainerCard percentHeight={90} percentWidth={75} bg="#343a40" shadow>
          <CloseButton icon={<i className="far fa-times-circle"/>} onCloseClick={props.closeModal}/>
          {Body}
        </ContainerCard>
      </ModalBackground>
    </Portal>
  );
}
