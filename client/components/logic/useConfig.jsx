import { useState, useEffect } from 'react';

export function useUser(userProps) {
  const [id, setId] = useState(null);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    if (userProps) {
      Object.keys(userProps).forEach(key => {
        switch (key) {
          case 'id':
            setId(userProps.id); break;
        }
      });
    }
  });

  return { user: { id, userName } };
}

// function useCampaign(campaignProps) {
//   const [campaignId, setCampaingId] = useState(null);
//   const [campaignGM, setcampaignGM] = useState(null);

//   if (Object.keys(campaignProps).includes('campaignGM')) {
//     setcampaignGM(campaignProps.campaignGM);
//   }
//   return { campaign: { campaignId, campaignGM } };
// }

// function useConfig(configProps) {
//   const [user, setUser] = useState(useUser(null));
//   const [campaign, setCampaign] = useState(useCampaign(null));

//   if (Object.keys(configProps).includes('user')) {
//     setUser(configProps.user);
//   }

//   return { user, campaign };
// }
