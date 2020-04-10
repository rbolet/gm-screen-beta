export const guestCampaign = {
  campaignId: 2,
  campaignName: 'Guest Campaign',
  campaignGM: 5,
  campaignAssets: [
    {
      imageId: 4,
      fileName: '9cf9225a-979f-40cc-a934-e270c1c752a9..jpg',
      category: 'Environment',
      alias: 'Village'
    },
    {
      imageId: 5,
      fileName: '0c00a350-dfbb-4d8f-98af-e0815bbdaefb..png',
      category: 'Secondary',
      alias: 'Elf'
    }
  ]
};

export function createRandomGuest(userRole, playerNum) {
  let userId, userName;
  if (userRole === 'gm') {
    userId = '5';
    userName = 'Game Master (Guest)';
  } else {
    userId = playerNum === 1 ? '6' : '7';
    userName = playerNum === 1 ? 'Sam (Guest)' : 'Max (Guest)';
  }

  return { userId, userName, userRole };

}
