import { NextResponse } from "next/server";

import { ResponseBuilder } from "../../../lib/response-builder";

import { createClient } from "@/lib/auth";

export const GET = async () => {
  try {
    const metaData = await createClient();

    const response = NextResponse.json(metaData.clientMetadata);

    response.headers.set("Content-Type", "application/json");

    return response;
  } catch (err) {
    console.error("error in api/related-words", err);
    return new NextResponse(
      ResponseBuilder([], "Error fetching word list", true),
    );
  }
};
