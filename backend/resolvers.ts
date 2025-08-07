import { calculateMemberFee } from './pricingService';

// In-memory storage for study clubs. In a production environment this
// would be replaced with calls to a database (e.g. DynamoDB or Aurora).
const clubs: any[] = [];

export const resolvers = {
  Query: {
    getClub: async (_: any, args: { id: string }) => {
      return clubs.find((club) => club.id === args.id) || null;
    },
    listClubs: async () => {
      return clubs;
    },
  },
  Mutation: {
    createClub: async (_: any, args: { name: string; tier: number; seats: number; leaderContribution: number }) => {
      const { name, tier, seats, leaderContribution } = args;
      const { memberFee } = calculateMemberFee({ seats, leaderContribution });
      const club = {
        id: Date.now().toString(),
        name,
        tier,
        seats,
        leaderContribution,
        memberFee,
        createdAt: new Date().toISOString(),
      };
      clubs.push(club);
      return club;
    },
    updateClub: async (_: any, args: { id: string; tier?: number; seats?: number; leaderContribution?: number }) => {
      const { id, tier, seats, leaderContribution } = args;
      const index = clubs.findIndex((c) => c.id === id);
      if (index < 0) return null;
      const club = clubs[index];
      if (tier !== undefined) club.tier = tier;
      if (seats !== undefined) club.seats = seats;
      if (leaderContribution !== undefined) club.leaderContribution = leaderContribution;
      if (seats !== undefined || leaderContribution !== undefined) {
        const { memberFee } = calculateMemberFee({ seats: club.seats, leaderContribution: club.leaderContribution });
        club.memberFee = memberFee;
      }
      return club;
    },
  },
};
