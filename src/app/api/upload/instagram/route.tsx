import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import {
  AppBskyVideoDefs,
  AppBskyEmbedVideo,
  BlobRef,
  AtpAgent,
} from "@atproto/api";

import { ResponseBuilder } from "../../../../lib/response-builder";
import { createClient, getSessionAgent } from "@/lib/auth";
import { InstagramPost } from "@/lib/types";
import { DidDocument } from "@/lib/types.atproto";
import { getBufferFromFile } from "@/lib/utils";

export const POST = async (req: NextRequest) => {
  try {
    const oauthClient = await createClient();
    const sessionCookies = await cookies();
    const agent = await getSessionAgent(sessionCookies, oauthClient);

    if (!agent) {
      console.error("No session");
      return new NextResponse(ResponseBuilder(null, "Session required", true));
    }

    const videoAgent = new AtpAgent({ service: "https://video.bsky.app" });
    const repo = await agent.com.atproto.repo.describeRepo({ repo: agent.did });
    const didDoc = repo.data.didDoc as DidDocument;

    const { data: serviceAuth } = await agent.com.atproto.server.getServiceAuth(
      {
        aud: `did:web:${didDoc.service[0].serviceEndpoint.split("https://")[1]}`,
        lxm: "com.atproto.repo.uploadBlob",
        exp: Date.now() / 1000 + 60 * 30, // 30 minutes
      },
    );

    const token = serviceAuth.token;
    const data: FormData = await req.formData();

    const posts: InstagramPost[] = [];
    const media = new Map<string, File>();

    let videoCount = 0;

    for (const entry of data) {
      const fileName = entry[0];
      const file = entry[1] as File;
      // console.log(entry)
      switch (file.type) {
        case "application/json":
          if (fileName.includes("posts_")) {
            const fileArrayBuffer = await file.arrayBuffer();
            const fileDataBuffer = Buffer.from(fileArrayBuffer).toJSON().data;
            const fileJsonString =
              Buffer.from(fileDataBuffer).toString("utf-8");
            const fileJson: InstagramPost[] = JSON.parse(fileJsonString);

            for (let i = 0; i < 2; i++) {
              const post = fileJson[i];
              const mediaBlobs: BlobRef[] = [];

              for (let j = 0; j < post.media.length; j++) {
                const mediaObject = post.media[j];
                const mediaUri = mediaObject.uri;
                const mediaFileName =
                  mediaUri.split("/")[mediaUri.split("/").length - 1];
                const mediaFile = data.get(mediaFileName) as File;
                const mediaFileBuffer = await getBufferFromFile(mediaFile);

                console.log("mediaFile", mediaFile);

                if (mediaFile.type === 'video/mp4') {

                } else {
                  const response = await agent.uploadBlob(mediaFileBuffer, { encoding: file.type });

                  mediaBlobs.push(response.data.blob);
                }
              }

              // await agent.post({
              //   text: 'Check out these images!',
              //   embed: {
              //     $type: 'app.bsky.embed.images',
              //     images: mediaB
              //   }
              // });
            }
          }

          break;
        case "video/mp4":

        case "image/jpeg":
        case "image/webp":
          break;
      }
    }

    // for (const entry of data) {
    //   const fileName = entry[0];
    //   const file = entry[1] as File;

    //   switch (file.type) {
    //     case "application/json":
    //       break;
    //       case "video/mp4":
    //         videoCount++;
    //         if (
    //           file.name ===
    //           "AQNFqi3xj_vomVY0082lZ1zTjYofgZ3Is86TMLDdUYloqD4w_gg5pbyVwcuYZbubSvtBz79ezy_hd5jrNUcvvvXKCEbJO1hxj9sosI_17856440947040868.mp4"
    //         ) {
    //         console.log(file);
    //         const fileBuffer = await getVideoBuffer(file);
    //         console.log("agent.sessionManager.did", agent.sessionManager.did);
    //         const uploadUrl = new URL(
    //           "https://video.bsky.app/xrpc/app.bsky.video.uploadVideo",
    //         );

    //         uploadUrl.searchParams.append("did", agent.did);
    //         uploadUrl.searchParams.append(
    //           "name",
    //           file.name.split(".")[0] + "try1",
    //         );
    //         console.log("bearer:", token);
    //         // const videoUploadResponse = await fetch(uploadUrl, {
    //         //   method: "POST",
    //         //   headers: {
    //         //     Authorization: `Bearer ${token}`,
    //         //     "Content-Type": "video/mp4",
    //         //     "Content-Length": String(file.size),
    //         //   },
    //         //   body: fileBuffer,
    //         // });

    //         // const jobStatus =
    //         //   (await videoUploadResponse.json()) as AppBskyVideoDefs.JobStatus;

    //         // let blob: BlobRef | undefined = jobStatus.blob;

    //         // while (!blob) {
    //         //   const { data: status } =
    //         //     await videoAgent.app.bsky.video.getJobStatus({
    //         //       jobId: jobStatus.jobId,
    //         //     });

    //         //   console.log(
    //         //     "Status:",
    //         //     status.jobStatus.state,
    //         //     status.jobStatus.progress || "",
    //         //   );

    //         //   if (status.jobStatus.blob) {
    //         //     blob = status.jobStatus.blob;
    //         //   }
    //         //   // wait a second
    //         //   await new Promise((resolve) => setTimeout(resolve, 1000));
    //         // }

    //         // console.log("videoUploadResponse blob?", blob);

    //         // console.log("posting...");

    //         // await agent.post({
    //         //   text: "This post should have a video attached :)",
    //         //   langs: ["en"],
    //         //   embed: {
    //         //     $type: "app.bsky.embed.video",
    //         //     video: blob,
    //         //     aspectRatio: { width: 720, height: 720 },
    //         //   } satisfies AppBskyEmbedVideo.Main,
    //         // });

    //         console.log("done ✨");
    //       }
    //       break;
    //     case "image/jpeg":
    //     case "image/webp":
    //       break;
    //   }
    // }
    console.log("videoCount", videoCount);
    console.log("posts.length", posts.length);

    return new NextResponse(
      ResponseBuilder({ success: true }, "success", false),
    );
  } catch (err) {
    console.error("App error in api/oauth/initiate", err);
    return new NextResponse(ResponseBuilder(null, "Error logging in", true));
  }
};
