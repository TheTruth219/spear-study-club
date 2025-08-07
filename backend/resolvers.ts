import { calculateMemberFee } from './pricingService';

// In-memory storage for study clubs and events. In a production environment
// these would be replaced with calls to a database (e.g. DynamoDB or Aurora).
const clubs: any[] = [];
const events: any[] = [];

export const resolvers = {
  Query: {
    getClub: async (_: any, args: { id: string }) => {
      return clubs.find((club) => club.id === args.id) || null;
    },
    listClubs: async () => {
      return clubs;
    },
    listEvents: async (_: any, args: { clubId: string }) => {
      return events.filter((event) => event.clubId === args.clubId);
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
    createEvent: async (_: any, args: { clubId: string; name: string; startDate: string; endDate: string; location?: string; description?: string; moduleId?: string }) => {
      const { clubId, name, startDate, endDate, location, description, moduleId } = args;
      const event = {
        id: Date.now().toString(),
        clubId,
        name,
        startDate,
        endDate,
        location,
        description,
        moduleId,
        createdAt: new Date().toISOString(),
      };
      events.push(event);
      return event;
    },
    updateEvent: async (_: any, args: { id: string; name?: string; startDate?: string; endDate?: string; location?: string; description?: string; moduleId?: string }) => {
      const { id, name, startDate, endDate, location, description, moduleId } = args;
      const index = events.findIndex((e) => e.id === id);
      if (index < 0) return null;
      const event = events[index];
      if (name !== undefined) event.name = name;
      if (startDate !== undefined) event.startDate = startDate;
      if (endDate !== undefined) event.endDate = endDate;
      if (location !== undefined) event.location = location;
      if (description !== undefined) event.description = description;
      if (moduleId !== undefined) event.moduleId = moduleId;
      return event;
    },
    deleteEvent: async (_: any, args: { id: string }) => {
      const { id } = args;
      const index = events.findIndex((e) => e.id === id);
      if (index < 0) return false;
      events.splice(index, 1);
      return true;
    },
  },
};
