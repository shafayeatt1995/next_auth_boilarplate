"use client";
import React from "react";
import { LogOutIcon } from "lucide-react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { logOut } from "@/services/nextAuth";

export default function NavLogout() {
  const submit = async () => {
    await logOut();
    window.location.replace("/");
  };
  return (
    <DropdownMenuItem
      onClick={submit}
      className="text-rose-500 cursor-pointer focus:bg-rose-100 focus:text-rose-600"
    >
      <LogOutIcon /> Log out
    </DropdownMenuItem>
  );
}
