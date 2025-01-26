import { NextResponse } from "next/server";

import { ResponseBuilder } from "../../../lib/response-builder";

import { createClient } from "@/lib/oauth";

export const GET = async () => {
  try {
    const metaData = await createClient();

    return new NextResponse(JSON.stringify(metaData.clientMetadata));
  } catch (err) {
    console.error("error in api/related-words", err);
    return new NextResponse(
      ResponseBuilder([], "Error fetching word list", true),
    );
  }
};
