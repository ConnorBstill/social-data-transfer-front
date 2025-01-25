// import { NodeOAuthClient, NodeSavedSessionStore, NodeSavedState, Session, NodeSavedStateStore } from '@atproto/oauth-client-node'
// // import type { Database } from '#/db'
// // import { env } from '#/lib/env'
// // import { SessionStore, StateStore } from './storage'

// const sessionStore: NodeSavedSessionStore = {
//   async set(sub: string, sessionData: NodeSavedSession) {
//     // Insert or update the session data in your database
//     await saveSessionDataToDb(sub, sessionData)
//   },

//   async get(sub: string) {
//     // Retrieve the session data from your database
//     const sessionData = await getSessionDataFromDb(sub)
//     if (!sessionData) return undefined

//     return sessionData
//   },

//   async del(sub: string) {
//     // Delete the session data from your database
//     await deleteSessionDataFromDb(sub)
//   },
// }

// const stateStore: NodeSavedStateStore = {
//   async set(sub: string, sessionData: NodeSavedSession) {
//     // Insert or update the session data in your database
//     await saveSessionDataToDb(sub, sessionData)
//   },

//   async get(sub: string) {
//     // Retrieve the session data from your database
//     const sessionData = await getSessionDataFromDb(sub)
//     if (!sessionData) return undefined

//     return sessionData
//   },

//   async del(sub: string) {
//     // Delete the session data from your database
//     await deleteSessionDataFromDb(sub)
//   },
// }

// export const createClient = async (
//   // db: Database
// ) => {
//   const publicUrl = env.PUBLIC_URL
//   const url = publicUrl || `http://127.0.0.1:${env.PORT}`
//   const enc = encodeURIComponent
//   return new NodeOAuthClient({
//     clientMetadata: {
//       client_name: 'AT Protocol Express App',
//       client_id: publicUrl
//         ? `${url}/client-metadata.json`
//         : `http://localhost?redirect_uri=${enc(`${url}/oauth/callback`)}&scope=${enc('atproto transition:generic')}`,
//       client_uri: url,
//       redirect_uris: [`${url}/oauth/callback`],
//       scope: 'atproto transition:generic',
//       grant_types: ['authorization_code', 'refresh_token'],
//       response_types: ['code'],
//       application_type: 'web',
//       token_endpoint_auth_method: 'none',
//       dpop_bound_access_tokens: true,
//     },
//     // sessionStore
//     stateStore: {
//       async set(key: string, internalState: NodeSavedState): Promise<void> {},
//       async get(key: string): Promise<NodeSavedState | undefined> {},
//       async del(key: string): Promise<void> {},
//     },
//     sessionStore: {
//       async set(sub: string, session: Session): Promise<void> {},
//       async get(sub: string): Promise<Session | undefined> {},
//       async del(sub: string): Promise<void> {},
//     },
//   })
// }

// // https://bsky.social/oauth/authorize?client_id=http%3A%2F%2Flocalhost%3Fredirect_uri%3Dhttp%253A%252F%252F127.0.0.1%253A8080%252Foauth%252Fcallback%26scope%3Datproto%2520transition%253Ageneric&request_uri=urn%3Aietf%3Aparams%3Aoauth%3Arequest_uri%3Areq-05fb53bd37e88058633db530d320e122
