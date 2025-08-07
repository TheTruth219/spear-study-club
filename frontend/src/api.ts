const GRAPHQL_ENDPOINT = import.meta.env.VITE_GRAPHQL_ENDPOINT || '/graphql';

interface GraphQLResponse<T> {
  data?: T;
  errors?: { message: string }[];
}

async function graphqlRequest<T>(query: string, variables?: Record<string, any>): Promise<T> {
  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  });
  const json: GraphQLResponse<T> = await response.json();
  if (json.errors && json.errors.length > 0) {
    throw new Error(json.errors[0].message);
  }
  return json.data!;
}

export async function listClubs() {
  const query = `
    query {
      listClubs {
        id
        name
        seats
        leaderContribution
        memberFee
      }
    }
  `;
  return graphqlRequest(query);
}

export async function createClub(name: string, seats: number, leaderContribution: number) {
  // Determine tier based on seat count (1=8-11, 2=12-15, 3=16-18)
  const tier = seats >= 8 && seats <= 11 ? 1 : seats <= 15 ? 2 : 3;
  const mutation = `
    mutation ($name: String!, $tier: Int!, $seats: Int!, $leaderContribution: Float!) {
      createClub(name: $name, tier: $tier, seats: $seats, leaderContribution: $leaderContribution) {
        id
        name
        seats
        leaderContribution
        memberFee
      }
    }
  `;
  return graphqlRequest(mutation, { name, tier, seats, leaderContribution });
}
