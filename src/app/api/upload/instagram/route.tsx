import { NextRequest, NextResponse } from "next/server";

import { ResponseBuilder } from "../../../../lib/response-builder";

interface InstagramData {
  handle: string;
}

export const POST = async (req: NextRequest) => {
  try {
    const body = (await req.json()) as InstagramData;

    return new NextResponse(
      ResponseBuilder({ success: true }, "success", false),
    );
  } catch (err) {
    console.error("App error in api/oauth/initiate", err);
    return new NextResponse(ResponseBuilder(null, "Error logging in", true));
  }
};
