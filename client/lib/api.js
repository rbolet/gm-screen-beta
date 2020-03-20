
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

export function addUserToUserSockets(user) {
  const body = JSON.stringify({ user });

  fetch('/sockets', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body
  })
    .then(jsonRes => jsonRes.json())
    .then(response => {})
    .catch(err => console.error(err));
}
