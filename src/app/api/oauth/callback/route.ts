import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import { createClient, getCookieSession } from "@/lib/auth";

export const GET = async (req: NextRequest) => {
  try {
    const params = new URLSearchParams(req.url.split("?")[1]);
    const oauthClient = await createClient();
    const { session } = await oauthClient.callback(params);
    const sessionCookies = await cookies();
    const clientSession = await getCookieSession(sessionCookies);

    clientSession.did = session.did;

    await clientSession.save();
  } catch (err) {
    console.error("error in oauth/callback", err);
    return NextResponse.redirect(`${process.env.PUBLIC_URL}/`, {
      status: 307,
    });
  }

  return NextResponse.redirect(
    `${process.env.ENV_MODE === "dev" ? "http://127.0.0.1:3000" : process.env.PUBLIC_URL}/transfer`,
    {
      status: 307,
    },
  );
};
