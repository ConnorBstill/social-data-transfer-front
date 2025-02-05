"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import { logOut } from "@/services/auth";

import { Button } from "../button";

export default function LogoutButton() {
  const router = useRouter();
  const logoutMutation = useMutation({
    mutationFn: logOut,
    onSuccess: (res) => {
      const { err } = res;

      if (!err) {
        router.push("/");
      }
    },
    onError: (err) => {
      console.log("Error logging out", err);
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return <Button onClick={handleLogout}>Log Out</Button>;
}
