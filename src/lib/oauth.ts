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
    const session = JSON.stringify(sessionData);

    await db.insert(authSession).values({ key, session });
  },

  async get(key: string): Promise<NodeSavedSession | undefined> {
    const [sessionData] = await db.query.authSession.findMany({
      where: (data, { eq }) => eq(data.key, key),
    });

    if (!sessionData.session) return undefined;

    return JSON.parse(sessionData.session) as NodeSavedSession;
  },

  async del(key: string): Promise<void> {
    await db.delete(authSession).where(eq(authSession.key, key));
  },
};

const stateStore: NodeSavedStateStore = {
  async set(key: string, stateData: NodeSavedState): Promise<void> {
    const state = JSON.stringify(stateData);

    await db.insert(authState).values({ key, state });
  },

  async get(key: string): Promise<NodeSavedState | undefined> {
    const [stateData] = await db.query.authState.findMany({
      where: (data, { eq }) => eq(data.key, key),
    });

    if (!stateData.state) return undefined;

    return JSON.parse(stateData.state) as NodeSavedState;
  },

  async del(key: string): Promise<void> {
    await db.delete(authState).where(eq(authState.key, key));
  },
};

export const createClient = async () => {
  const publicUrl = process.env.PUBLIC_URL;
  const url = publicUrl || `http://127.0.0.1:${process.env.PORT}`;
  const enc = encodeURIComponent;
  return new NodeOAuthClient({
    clientMetadata: {
      client_name: "AT Protocol Express App",
      client_id: publicUrl
        ? `${url}/api/client-metadata.json`
        : `http://localhost?redirect_uri=${enc(`${url}/oauth/callback`)}&scope=${enc("atproto transition:generic")}`,
      client_uri: url,
      redirect_uris: [`${url}/oauth/callback`],
      scope: "atproto transition:generic",
      grant_types: ["authorization_code", "refresh_token"],
      response_types: ["code"],
      application_type: "web",
      token_endpoint_auth_method: "none",
      dpop_bound_access_tokens: true,
    },
    sessionStore,
    stateStore,
  });
};
