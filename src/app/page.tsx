import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center w-full h-full">
      <p className="mb-5">
        Go{" "}
        <Link
          href="https://www.youtube.com/watch?v=F1sJW6nTP6E"
          target="_blank"
          className="text-primary"
        >
          here
        </Link>{" "}
        to learn about the AT Protocol.
      </p>

      <p className="mb-5">
        Click "Begin" to login to Bluesky and upload your files for transfer.
      </p>

      <div className="flex justify-center w-full">
        <Link
          href="/login-bsky"
          className={buttonVariants({ variant: "default" })}
        >
          Begin
        </Link>
      </div>
    </main>
  );
}
