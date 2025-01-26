import { NextRequest, NextResponse } from "next/server";

import { isValidHandle } from "@atproto/syntax";
import type { OAuthClient } from "@atproto/oauth-client-node";

import { createClient } from "@/lib/oauth";

import { ResponseBuilder } from "../../../../lib/response-builder";

interface LoginRequestBody {
  handle: string;
}

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const body = (await req.json()) as LoginRequestBody;
    const handle = body.handle;

    if (typeof handle !== "string" || !isValidHandle(handle)) {
      return new NextResponse(ResponseBuilder(null, "invalid handle", true));
    }

    const oauthClient: OAuthClient = await createClient();
    const url = await oauthClient.authorize(handle, {
      scope: "atproto transition:generic",
    });

    const redirectUrl = url.toString();
    // connorbstill.bsky.social
    return NextResponse.redirect(redirectUrl, { status: 307 });
  } catch (err) {
    console.error("error in api/related-words", err);
    return new NextResponse(
      ResponseBuilder([], "Error fetching word list", true),
    );
  }
};
