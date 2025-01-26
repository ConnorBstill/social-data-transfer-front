import Link from "next/link";

import { Input } from "@/components/ui/input";

import { Button, buttonVariants } from "@/components/ui/button";
import { BlueskyLogo } from "@/components/ui/svg/bluesky-logo";
import { LoginField } from "@/components/ui/login-button";

export default function LoginPage() {
  return (
    <main className="flex justify-center items-center w-full h-full">
      <div className="flex flex-col justify-between items-center w-1/2 h-1/2">
        <div className="flex">
          <h1 className="text-3xl font-semibold mr-3">Log In to Bluesky</h1>
          <BlueskyLogo height={50} width={50} />
        </div>

        <p className="text-center">
          Providing your Bluesky handle and pressing "Log In" will redirect you
          to Bluesky Bluesky to give temporary permission to this site to
          publish it to your account. We do not interact with or store your
          password in any way, and we do not keep your uploaded data.
        </p>

        <div className="flex flex-row justify-center items-center w-3/4">
          <LoginField />
        </div>
      </div>
    </main>
  );
}
