import { NextRequest, NextResponse } from "next/server";

import { createClient, getSessionAgent } from "@/lib/auth";
import { cookies } from "next/headers";

import { ResponseBuilder } from "../../../../lib/response-builder";

import { InstagramPost } from "@/lib/types";

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

    const posts: InstagramPost[] = [];
    // const media = new Map<string, File>();
    let bytes = 0;
    console.log("running");
    for (const entry of data) {
      const fileName = entry[0];
      const file = entry[1] as File;
      // console.log(file);

      switch (file.type) {
        case "application/json":
          if (fileName.includes("posts")) {
            const fileArrayBuffer = await file.arrayBuffer();
            const fileDataBuffer = Buffer.from(fileArrayBuffer).toJSON().data;
            const fileJsonString =
              Buffer.from(fileDataBuffer).toString("utf-8");
            const fileJson = JSON.parse(fileJsonString);

            posts.push(fileJson);
          }
          break;
        case "video/mp4":
          if (
            file.name ===
            "AQNFqi3xj_vomVY0082lZ1zTjYofgZ3Is86TMLDdUYloqD4w_gg5pbyVwcuYZbubSvtBz79ezy_hd5jrNUcvvvXKCEbJO1hxj9sosI_17856440947040868.mp4"
          ) {
            const header = Buffer.from("mvhd");
            const videoArrayBuffer = await file.arrayBuffer();
            const videoBuffer = Buffer.from(videoArrayBuffer);

            const videoStart = videoBuffer.indexOf(header) + 17;
            const timeScale = videoBuffer.readUInt32BE(videoStart);
            const duration = videoBuffer.readUInt32BE(videoStart + 4);

            const videoLength = Math.floor(duration / timeScale);
            console.log("videoLength", videoLength);
          }
          break;
        case "image/jpeg":
        case "image/webp":
          break;
      }

      bytes += file.size;
    }

    const kilobytes = bytes / 1024;
    const megabytes = kilobytes / 1024;
    console.log(megabytes.toFixed(2));
    console.log("posts.length", posts.length);

    return new NextResponse(
      ResponseBuilder({ success: true }, "success", false),
    );
  } catch (err) {
    console.error("App error in api/oauth/initiate", err);
    return new NextResponse(ResponseBuilder(null, "Error logging in", true));
  }
};
