export const blankUser = {
  userId: null,
  userName: null,
  userRole: null,
  socketId: null
};

export const blankCampaign = {
  campaignId: null,
  campaignName: null,
  campaignGM: null,
  campaignAssets: [],
  // room: null, <-- backend should handle room assignment
  roomUserList: []
};

export const blankSession = {
  sessionId: null,
  environmentImageFileName: null,
  tokens: []
};
