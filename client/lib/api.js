
export function fetchCampaignAssets(campaign) {
  const currentCampaign = JSON.stringify(campaign);

  return (
    fetch('/campaignAssets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: currentCampaign
    })
      .then(jsonRes => jsonRes.json())
      .then(campaignAssets => { return campaignAssets; })
      .catch(error => { console.error(error); })
  );
}

export function configUserSocket(user) {
  const body = JSON.stringify({ user });

  return (
    fetch('/config/socket', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body
    })
      .then(jsonRes => jsonRes.json())
      .then(systemNoteTuple => { return systemNoteTuple; })
      .catch(err => { console.error(err); })
  );
}

export function uploadImageForm(formData, campaignId) {
  return fetch('/upload', { method: 'POST', 'content-type': 'multipart/form-data', body: formData })
    .then(res => res.json())
    .then(result => result)
    .catch(err => { console.error(err); });
}

export function getCampaignAssets(campaignId) {
  const body = JSON.stringify({ campaignId });
  return fetch('/campaignAssets', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body
  })
    .then(jsonRes => jsonRes.json())
    .then(result => result)
    .catch(error => {
      console.error(`Error in GET return: ${error}`);
    });
}
