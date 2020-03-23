
export function fetchCampaignAssets(campaign) {
  return new Promise((resolve, reject) => {
    const currentCampaign = JSON.stringify(campaign);
    fetch('/campaignAssets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: currentCampaign
    })
      .then(jsonRes => jsonRes.json())
      .then(campaignAssets => campaignAssets)
      .catch(error => console.error(error));
  });
}
