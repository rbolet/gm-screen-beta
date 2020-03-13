import React from 'react';

export const Campaign = React.createContext(null);

export function CampaignContext(props) {
  const [campaignId, setCampaignId] = React.useState(null);
  const [campaignName, setCampaignName] = React.useState(null);
  const [campaignGM, setCampaignGM] = React.useState(null);
  const [campaignAssets, setCampaignAssets] = React.useState([]);

  const updateCampaign = campaignObject => {
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
      }
    });
  };

  const campaign = { campaignId, campaignName, campaignGM, campaignAssets };
  return (
    <Campaign.Provider value={{ campaign, updateCampaign }}>{props.children}</Campaign.Provider>
  );
}
