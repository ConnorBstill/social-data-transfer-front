import { NextRequest, NextResponse } from "next/server";

import { ResponseBuilder } from "../../../../lib/response-builder";

export const POST = async (req: NextRequest) => {
  try {
    const data: FormData = await req.formData();

    return new NextResponse(
      ResponseBuilder({ success: true }, "success", false),
    );
  } catch (err) {
    console.error("App error in api/oauth/initiate", err);
    return new NextResponse(ResponseBuilder(null, "Error logging in", true));
  }
};
