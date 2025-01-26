"use client";

import { useRef } from "react";

import { Button } from "./button";
import { Input } from "./input";

export const LoginField = () => {
  const inputRef = useRef(null);

  return (
    <>
      <Input
        className="w-2/3 mr-5"
        placeholder="Enter your handle (e.g. alice.bsky.social)"
        ref={inputRef}
      />

      <Button>Log In</Button>
    </>
  );
};
