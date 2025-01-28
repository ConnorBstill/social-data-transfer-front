import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { ResponseBuilder } from "../../../../lib/response-builder";
import { destroyCookieSession } from "@/lib/auth";

export const POST = async () => {
  try {
    await destroyCookieSession(await cookies());

    return new NextResponse(ResponseBuilder(null, "success", false));
  } catch (err) {
    console.error("App error in oauth/logout", err);
    return new NextResponse(ResponseBuilder(null, "Error logging in", true));
  }
};
