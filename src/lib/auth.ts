import { Agent } from "@atproto/api";
import {
  NodeOAuthClient,
  NodeSavedSession,
  NodeSavedSessionStore,
  NodeSavedState,
  NodeSavedStateStore,
} from "@atproto/oauth-client-node";
import { getIronSession } from "iron-session";

import { db } from "@/server/db";
import { authSession, authState } from "@/server/db/schema";
import { eq } from "drizzle-orm";

import { OauthSession } from "./types";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export const getSessionAgent = async (
  cookies: ReadonlyRequestCookies,
  oauthClient: NodeOAuthClient,
): Promise<Agent | null> => {
  const session = await getCookieSession(cookies);

  if (!session.did) return null;

  try {
    const oauthSession = await oauthClient.restore(session.did);
    return oauthSession ? new Agent(oauthSession) : null;
  } catch (err) {
    console.error("Error getting oauth session", err);
    await session.destroy();
    return null;
  }
};

const sessionStore: NodeSavedSessionStore = {
  async set(key: string, session: NodeSavedSession) {
    const [prevSessionKey] = await await db.query.authSession.findMany({
      where: (data, { eq }) => eq(data.key, key),
    });

    if (prevSessionKey)
      await db.delete(authSession).where(eq(authSession.key, key));

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
  async set(key: string, state: NodeSavedState): Promise<void> {
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
  const url =
    process.env.ENV_MODE === "dev"
      ? `http://127.0.0.1:${process.env.PORT}`
      : process.env.PUBLIC_URL;
  const enc = encodeURIComponent;
  return new NodeOAuthClient({
    clientMetadata: {
      client_name: "AT Protocol Express App",
      client_id:
        process.env.ENV_MODE === "dev"
          ? `http://localhost?redirect_uri=${enc(`${url}/api/oauth/callback`)}&scope=${enc("atproto transition:generic")}`
          : `${url}/api/client-metadata.json`,
      client_uri: url,
      redirect_uris: [`${url}/api/oauth/callback`],
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

export const getCookieSession = async (cookies: ReadonlyRequestCookies) => {
  return await getIronSession<OauthSession>(cookies, {
    cookieName: "sid",
    password: process.env.COOKIE_SECRET,
  });
};

export const destroyCookieSession = async (cookies: ReadonlyRequestCookies) => {
  const session = await getIronSession<OauthSession>(cookies, {
    cookieName: "sid",
    password: process.env.COOKIE_SECRET,
  });

  await session.destroy();
};
