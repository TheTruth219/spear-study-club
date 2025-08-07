const GRAPHQL_ENDPOINT = import.meta.env.VITE_GRAPHQL_ENDPOINT || '/graphql';

interface GraphQlResponse<T> {
  data?: T;
  errors?: { message: string }[];
}

async function graphQlRequest<T>(query: string, variables?: Record<string, any>): Promise<T> {
  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  });
  const json: GraphQlResponse<T> = await response.json();
  if (json.errors && json.errors.length > 0) {
    throw new Error(json.errors[0].message);
  }
  return json.data!;
}

export async function listEvents(clubId: string) {
  const query = `
    query ListEvents($clubId: ID!) {
      listEvents(clubId: $clubId) {
        id
        clubId
        name
        startDate
        endDate
        location
        description
        moduleId
        createdAt
      }
    }
  `;
  return graphQlRequest(query, { clubId });
}

export async function createEvent(
  clubId: string,
  name: string,
  startDate: string,
  endDate: string,
  location?: string,
  description?: string,
  moduleId?: string
) {
  const mutation = `
    mutation CreateEvent($clubId: ID!, $name: String!, $startDate: AWSDateTime!, $endDate: AWSDateTime!, $location: String, $description: String, $moduleId: ID) {
      createEvent(clubId: $clubId, name: $name, startDate: $startDate, endDate: $endDate, location: $location, description: $description, moduleId: $moduleId) {
        id
        clubId
        name
        startDate
        endDate
        location
        description
        moduleId
        createdAt
      }
    }
  `;
  const variables = { clubId, name, startDate, endDate, location, description, moduleId };
  return graphQlRequest(mutation, variables);
}

export async function updateEvent(
  id: string,
  updates: {
    name?: string;
    startDate?: string;
    endDate?: string;
    location?: string;
    description?: string;
    moduleId?: string;
  }
) {
  const mutation = `
    mutation UpdateEvent($id: ID!, $name: String, $startDate: AWSDateTime, $endDate: AWSDateTime, $location: String, $description: String, $moduleId: ID) {
      updateEvent(id: $id, name: $name, startDate: $startDate, endDate: $endDate, location: $location, description: $description, moduleId: $moduleId) {
        id
        clubId
        name
        startDate
        endDate
        location
        description
        moduleId
        createdAt
      }
    }
  `;
  return graphQlRequest(mutation, { id, ...updates });
}

export async function deleteEvent(id: string) {
  const mutation = `
    mutation DeleteEvent($id: ID!) {
      deleteEvent(id: $id)
    }
  `;
  return graphQlRequest(mutation, { id });
}
