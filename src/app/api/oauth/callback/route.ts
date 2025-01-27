import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import { getIronSession } from "iron-session";

import { ResponseBuilder } from "../../../../lib/response-builder";

import { createClient } from "@/lib/oauth";

interface Session {
  did: string;
}

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const params = new URLSearchParams(req.url.split("?")[1]);
    const oauthClient = await createClient();

    const { session } = await oauthClient.callback(params);
    const clientSession = await getIronSession<Session>(await cookies(), {
      cookieName: "sid",
      password: process.env.COOKIE_SECRET,
    });

    clientSession.did = session.did;

    await clientSession.save();

    return NextResponse.redirect(`${process.env.APP_URL}/transfer`, {
      status: 307,
    });
  } catch (err) {
    console.error("error in api/related-words", err);
    return new NextResponse(
      ResponseBuilder(null, "Oauth callback error", true),
    );
  }
};
