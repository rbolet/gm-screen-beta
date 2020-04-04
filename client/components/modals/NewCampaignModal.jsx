import React, { useState, useEffect, useRef, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import ModalBackground from '@components/modals/ModalBackground';
import ContainerCard from '@components/UI/ContainerCard';
import Portal from '@components/Portal';
import CloseButton from '@components/UI/CloseButton';
import { AppUser } from '@client/context/user-context';
import { addNewCampaign } from '@client/lib/api';

export default function NewCampaignModal(props) {
  const { user } = useContext(AppUser);
  const [campaignName, setCampaignName] = useState('');
  const keepFocused = useRef(null);

  useEffect(() => {
    keepFocused.current.focus();
  }, [campaignName]);

  return (
    <Portal>
      <ModalBackground>
        <ContainerCard
          bg="#343a40"
          header={
            <>
              <h5 className="text-center text-light mb-0 ml-1">Add New Campaign</h5>
              <CloseButton icon={<i className="far fa-times-circle" />} onCloseClick={() => { props.toggleModal(); }}/>
            </>
          }>
          <InputGroup className="mb-3">
            <FormControl
              aria-label="Recipient's username"
              ref={keepFocused}
              value={campaignName}
              onChange={() => { setCampaignName(event.target.value); }}
            />
            <InputGroup.Append>
              <Button disabled={!campaignName || typeof (user.userId === 'string')} variant="success"
                onClick={() => { addNewCampaign(user.userId, campaignName); }}><i className="fas fa-plus-circle" /></Button>
            </InputGroup.Append>
          </InputGroup>
        </ContainerCard>
      </ModalBackground>
    </Portal>
  );
}
