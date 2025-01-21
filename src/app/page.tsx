import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center w-full h-full">
      <p className="mb-5">
        Click{" "}
        <Link
          href="https://www.youtube.com/watch?v=F1sJW6nTP6E"
          target="_blank"
          className="text-primary"
        >
          here
        </Link>{" "}
        to learn about the AT Protocol.
      </p>

      <div className="flex justify-center w-full">
        <Link
          href="/transfer"
          className={buttonVariants({ variant: "default" })}
        >
          Transfer your data
        </Link>
      </div>
    </main>
  );
}
