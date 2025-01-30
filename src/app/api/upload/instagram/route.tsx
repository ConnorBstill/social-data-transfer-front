import { NextResponse } from "next/server";

import { createClient, getSessionAgent } from "@/lib/auth";
import { cookies } from "next/headers";
import { ResponseBuilder } from "../../../../lib/response-builder";

export const POST = async () => {
  try {
    const oauthClient = await createClient();
    const sessionCookies = await cookies();
    const agent = await getSessionAgent(sessionCookies, oauthClient);

    if (!agent) {
      console.error("No session");
      return new NextResponse(ResponseBuilder(null, "Session required", true));
    }

    // const uploadDir = path.join(process.cwd(), "social-data-temp");

    // const data: FormData = await req.formData();
    // // console.log('FORMA DATA: ', data)
    // const posts = [];
    // // const media
    // let bytes = 0;
    // for (let entry of data) {
    //   const fileName = entry[0];
    //   const file = entry[1] as File;
    //   // console.log(file.size)

    //   bytes += file.size;

    //   // if (fileName.includes('posts_')) posts.push(entry)
    // }
    // const kilobytes = bytes / 1024;
    // const megabytes = kilobytes / 1024;
    // console.log(megabytes.toFixed(2));

    return new NextResponse(
      ResponseBuilder({ success: true }, "success", false),
    );
  } catch (err) {
    console.error("App error in api/oauth/initiate", err);
    return new NextResponse(ResponseBuilder(null, "Error logging in", true));
  }
};
