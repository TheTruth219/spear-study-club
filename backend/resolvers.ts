export const resolvers = {
  Query: {
    getClub: async (_: any, args: { id: string }) => {
      // TODO: retrieve a club from the database
      return null;
    },
    listClubs: async () => {
      // TODO: list clubs
      return [];
    },
  },
  Mutation: {
    createClub: async (_: any, args: { name: string; tier: number; seats: number; leaderContribution: number }) => {
      // TODO: create a club
      return null;
    },
    updateClub: async (_: any, args: { id: string; tier?: number; seats?: number; leaderContribution?: number }) => {
      // TODO: update a club
      return null;
    },
  },
};
