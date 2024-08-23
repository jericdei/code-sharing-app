"use client";

import { Code } from "@prisma/client";
import Editor from "./editor";
import Logo from "./vector/logo";

export default function CodeSharing({ code }: { code?: Code }) {
  return (
    <main className="min-h-screen w-full grid place-items-center bg-cover bg-center bg-gradient py-8 text-neutral-700">
      <div className="flex flex-col w-full items-center gap-8">
        <Logo />
        <h1 className="heading text-center">
          Create &amp; Share <br />{" "}
          <span className="heading-lg">Your Code easily</span>
        </h1>

        <Editor code={code} />
      </div>
    </main>
  );
}
