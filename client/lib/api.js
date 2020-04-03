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

export function getCampaigns(user) {
  return fetch(`campaign/${user.userRole}/${user.userId}`, {
    method: 'GET',
    headers
  })
    .then(jsonRes => jsonRes.json())
    .then(campaignArray => campaignArray)
    .catch(err => {
      console.error('Error getting campaigna', err);
    });
}

export function getCampaignAssets(campaignId) {
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
