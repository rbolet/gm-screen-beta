const headers = { 'Content-Type': 'application/json' };

export function fetchCampaignAssets(campaign) {
  const currentCampaign = JSON.stringify(campaign);

  return (
    fetch('/campaignAssets', {
      method: 'POST',
      headers,
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
      headers,
      body
    })
      .then(jsonRes => jsonRes.json())
      .then(systemNoteTuple => { return systemNoteTuple; })
      .catch(err => { console.error('Error sending socket config information:', err); })
  );
}

export function uploadImageForm(formData) {
  return fetch('/upload', {
    method: 'POST',
    headers: { 'content-type': 'multipart/form-data' },
    body: formData
  })
    .then(res => res.json())
    .then(result => result)
    .catch(err => { console.error('Error sending form data', err); });
}

export function getCampaignAssets(campaignId) {
  const body = JSON.stringify({ campaignId });
  return fetch('/campaignAssets', {
    method: 'POST',
    headers,
    body
  })
    .then(jsonRes => jsonRes.json())
    .then(result => result)
    .catch(err => {
      console.error('Error getting campaign assets', err);
    });
}

export async function getSession(campaignId) {
  return fetch(`/session/${campaignId}`, headers)
    .then(res => res.json())
    .then(session => session)
    .catch(err => {
      console.error('Error getting session', err);
    });
}
