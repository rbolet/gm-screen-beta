/* eslint-disable no-console */
import React, { useState, useEffect, useContext } from 'react';
import { AppUser } from '@client/context/user-context';
import { getCampaignAssets, postUploadForm } from '@client/lib/api';

export const Campaign = React.createContext(null);

export function CampaignContext(props) {
  const [campaignId, setCampaignId] = useState(null);
  const [campaignName, setCampaignName] = useState(null);
  const [campaignGM, setCampaignGM] = useState(null);
  const [campaignAssets, setCampaignAssets] = useState([]);
  const [room, setRoom] = useState(null);
  const [roomUserList, setRoomUserList] = useState([]);
  const { user } = useContext(AppUser);

  useEffect(() => {
    if (user.userId) {
      getCampaignAssets(campaignId)
        .then(assetsArray => setCampaignAssets(assetsArray))
        .catch(err => console.error('Error fetching assets', err));
    }

  }, [campaignId]);

  const addImageToCampaign = async formData => {
    postUploadForm(formData)
      .then(addedImage => {
        const assetsCopy = campaignAssets.slice();
        assetsCopy.push(addedImage);
        return { campaignAssets: assetsCopy };
      })
      .then(newState => updateCampaign(newState))
      .catch(err => console.error('Error adding image to campaign', err));
  };

  const updateCampaign = async campaignObject => {
    Object.keys(campaignObject).forEach(key => {
      switch (key) {
        case 'campaignId':
          setCampaignId(campaignObject.campaignId); break;
        case 'campaignName':
          setCampaignName(campaignObject.campaignName); break;
        case 'campaignGM':
          setCampaignGM(campaignObject.campaignGM); break;
        case 'campaignAssets':
          setCampaignAssets(campaignObject.campaignAssets); break;
        case 'room':
          setRoom(campaignObject.room); break;
        case 'roomUserList':
          setRoomUserList(campaignObject.roomUserList); break;
      }
    });
  };

  const campaign = { campaignId, campaignName, campaignGM, campaignAssets, room, roomUserList };
  return (
    <Campaign.Provider value={{ campaign, updateCampaign, addImageToCampaign }}>{props.children}</Campaign.Provider>
  );
}
