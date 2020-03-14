
export function fetchCampaignAssets(campaignId) {
  return new Promise((resolve, reject) => {
    const currentCampaign = JSON.stringify({ campaign: { campaignId } });
    fetch('/campaignAssets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: currentCampaign
    })
      .then(jsonRes => jsonRes.json())
      .then(campaignAssets => campaignAssets)
      .catch(error => { return { error }; });
  });
}
