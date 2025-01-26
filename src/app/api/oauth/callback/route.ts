import { NextResponse } from "next/server";

import { ResponseBuilder } from "../../../../lib/response-builder";

export const GET = async () => {
  try {
    console.log("oauth callback");
    return new NextResponse(ResponseBuilder({ blah: "blah" }));
  } catch (err) {
    console.error("error in api/related-words", err);
    return new NextResponse(
      ResponseBuilder([], "Error fetching word list", true),
    );
  }
};
