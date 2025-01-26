"use client";

import { useRef } from "react";

import { Button } from "./button";
import { Input } from "./input";

export const LoginField = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleLoginClick = async () => {
    try {
      const loginResponse = await fetch(`/api/oauth/initiate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ handle: inputRef.current.value }),
      });

      window.location.href = loginResponse.url;
    } catch (err) {
      console.error("handleLoginClick", err);
    }
  };

  return (
    <>
      <Input
        className="w-2/3 mr-5"
        placeholder="Enter your handle (e.g. alice.bsky.social)"
        ref={inputRef}
      />

      <Button onClick={handleLoginClick}>Log In</Button>
    </>
  );
};
