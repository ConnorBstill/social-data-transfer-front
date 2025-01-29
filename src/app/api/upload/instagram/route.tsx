import { NextRequest, NextResponse } from "next/server";

import { ResponseBuilder } from "../../../../lib/response-builder";
import { createClient, getSessionAgent } from "@/lib/auth";
import { cookies } from "next/headers";

export const POST = async (req: NextRequest) => {
  try {
    const oauthClient = await createClient();
    const sessionCookies = await cookies();
    const agent = await getSessionAgent(sessionCookies, oauthClient);

    if (!agent) {
      console.error("No session");
      return new NextResponse(ResponseBuilder(null, "Session required", true));
    }

    const data: FormData = await req.formData();

    console.log("data", data);

    return new NextResponse(
      ResponseBuilder({ success: true }, "success", false),
    );
  } catch (err) {
    console.error("App error in api/oauth/initiate", err);
    return new NextResponse(ResponseBuilder(null, "Error logging in", true));
  }
};
