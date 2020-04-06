const headers = { 'Content-Type': 'application/json' };

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

export async function getCampaigns(user) {
  // manually set userId for guestGM
  const userId = (typeof (user.userId) === 'string') ? 5 : user.userId;
  return fetch(`campaign/${user.userRole}/${userId}`, {
    method: 'GET',
    headers
  })
    .then(jsonRes => jsonRes.json())
    .then(campaignArray => campaignArray)
    .catch(err => {
      console.error('Error getting campaigns', err);
    });
}

export async function deleteCampaign(campaignId) {
  return fetch(`campaign/${campaignId}`, { method: 'DELETE', headers })
    .then(jsonRes => jsonRes.json())
    .then(result => result)
    .catch(err => {
      console.error('Error deleting campaign', err);
    });
}

export async function addNewCampaign(userId, campaignName) {
  const body = JSON.stringify({ userId, campaignName });
  return fetch('campaign/new', {
    method: 'POST',
    headers,
    body
  })
    .then(jsonRes => jsonRes.json())
    .then(newCampaign => newCampaign)
    .catch(err => {
      console.error('Error adding new campaign', err);
    });
}

export async function getCampaignAssets(campaignId) {
  return fetch(`campaign/${campaignId}/assets`, {
    method: 'GET',
    headers
  })
    .then(jsonRes => jsonRes.json())
    .then(result => result)
    .catch(err => {
      console.error('Error getting campaign assets', err);
    });
}

export async function postUploadForm(formData) {
  return fetch('/campaign/upload', {
    method: 'POST',
    body: formData
  })
    .then(res => res.json())
    .then(result => result)
    .catch(err => { console.error('Error sending form data', err); });
}

export async function joinSession(campaign, user) {
  const body = JSON.stringify({ campaign, user });
  return fetch(`/campaign/${campaign.campaignId}/join`, {
    method: 'POST',
    headers,
    body
  })
    .then(res => res.json())
    .then(session => session)
    .catch(err => {
      console.error('Error getting session', err);
    });
}

export async function postEnvironment(sessionId, image) {
  const body = JSON.stringify(image);
  return fetch(`/session/${sessionId}/environment`, {
    method: 'POST',
    headers,
    body
  });
}

export async function postToken(token, sessionId) {
  token.hidden = token.hidden || 0;
  let method = 'POST';
  if (token.tokenId !== 'new') {
    method = 'PATCH';
  }
  const body = JSON.stringify({ token });
  return fetch(`session/${sessionId}/token`, {
    method,
    headers,
    body
  })
    .then(jsonResult => jsonResult.json())
    .then(insertId => {
    })
    .catch(err => { console.error(err); });
}

export async function deleteToken(token, sessionId) {
  let route = `session/${sessionId}/token`;
  if (token === 'all') {
    route += '/all';
  }
  const body = JSON.stringify({ token });

  return fetch(route, {
    method: 'DELETE',
    headers,
    body
  })
    .then(jsonResult => jsonResult.json()) // expects "sessionNote"
    .catch(err => { console.error(err); });
}
