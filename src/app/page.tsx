import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <p>
        Click <Link href="https://www.youtube.com/watch?v=F1sJW6nTP6E" target="_blank">here</Link> to learn about the AT Protocol.
        </p>

        <div className="flex justify-center w-full">
          <Link href="/transfer" className={buttonVariants({ variant: "default" })}>Transfer your data</Link>
        </div>
      </main>
    </div>
  );
}
