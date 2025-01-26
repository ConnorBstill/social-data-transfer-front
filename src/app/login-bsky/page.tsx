import Link from "next/link";

import { Input } from "@/components/ui/input";

import { buttonVariants } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <main className="flex justify-center items-center w-full h-full">
      <div className="flex flex-col justify-between items-center w-1/2 h-1/2">
        <h1 className="text-2xl font-semibold">Log In to Bluesky</h1>

        <p className="text-center">Providing your Bluesky handle and pressing "Log In" will redirect you to Bluesky to enter your password. Doing so will redirect you back here to start the process of uploading your chosen social media data and allow Bluesky to give temporary permission to this site to publish your uploaded data to your account. We do not interact with or store your password in any way, and we do not store your uploaded data.</p>
        
        <div className="flex flex-row items-center w-3/4">
          <Input className="w-2/3 mr-5" placeholder="Enter your handle (e.g. alice.bsky.social)"/>
          {/* <div className="flex justify-center w-full"> */}
          <Link
            href="/transfer"
            className={buttonVariants({ variant: "default" })}
          >
            Log In
          </Link>
          {/* </div> */}
        </div>
      </div>
    </main>
  );
}
