import {
  NodeOAuthClient,
  NodeSavedSession,
  NodeSavedSessionStore,
  NodeSavedState,
  NodeSavedStateStore,
} from "@atproto/oauth-client-node";

import { db } from "@/server/db";
import { authSession, authState } from "@/server/db/schema";
import { eq } from "drizzle-orm";

const sessionStore: NodeSavedSessionStore = {
  async set(key: string, sessionData: NodeSavedSession) {
    const session = sessionData;

    await db.insert(authSession).values({ key, session });
  },

  async get(key: string): Promise<NodeSavedSession | undefined> {
    const [sessionData] = await db.query.authSession.findMany({
      where: (data, { eq }) => eq(data.key, key),
    });

    if (!sessionData.session) return undefined;

    return sessionData.session;
  },

  async del(key: string): Promise<void> {
    await db.delete(authSession).where(eq(authSession.key, key));
  },
};

const stateStore: NodeSavedStateStore = {
  async set(key: string, stateData: NodeSavedState): Promise<void> {
    const state = stateData;

    await db.insert(authState).values({ key, state });
  },

  async get(key: string): Promise<NodeSavedState | undefined> {
    const [stateData] = await db.query.authState.findMany({
      where: (data, { eq }) => eq(data.key, key),
    });

    if (!stateData.state) return undefined;

    return stateData.state;
  },

  async del(key: string): Promise<void> {
    await db.delete(authState).where(eq(authState.key, key));
  },
};

export const createClient = async () => {
  // const publicUrl = process.env.PUBLIC_URL
  const url = process.env.DEV_MODE ?  `http://127.0.0.1:${process.env.PORT}` : process.env.PUBLIC_URL
  console.log('url', url)
  const enc = encodeURIComponent;
  return new NodeOAuthClient({
    clientMetadata: {
      client_name: 'AT Protocol Express App',
      client_id: `http://localhost?redirect_uri=${enc(`${url}/api/oauth/callback`)}&scope=${enc('atproto transition:generic')}`,
      client_uri: url,
      redirect_uris: [`${url}/api/oauth/callback`],
      scope: 'atproto transition:generic',
      grant_types: ['authorization_code', 'refresh_token'],
      response_types: ['code'],
      application_type: 'web',
      token_endpoint_auth_method: 'none',
      dpop_bound_access_tokens: true,
    },
    sessionStore,
    stateStore,
  });
};
