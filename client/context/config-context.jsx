import React from 'react';
import { UserContext } from './user-context';
import { CampaignContext } from './campaign-context';
import { SessionContext } from './session-context';

export default function ConfigContext(props) {
  return (

    <UserContext>
      <CampaignContext>
        <SessionContext>
          {props.children}
        </SessionContext>
      </CampaignContext>
    </UserContext>
  );
}
