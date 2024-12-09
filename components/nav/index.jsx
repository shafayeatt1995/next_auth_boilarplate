"use client";
import React, { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BoxesIcon, DollarSignIcon } from "lucide-react";
import NavLogout from "./NavLogout";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { authUser } from "@/services/nextAuth";
import eventBus from "@/utils/event";
import { setItem } from "@/utils";

export default function Nav() {
  const pathname = usePathname();
  const [user, setUser] = useState(null);
  const [isDashboard, setIsDashboard] = useState(false);

  const openModal = () => {
    setItem("socialLogin", `${window.location.origin}/dashboard`);
    eventBus.emit("loginModal");
  };

  useEffect(() => {
    setIsDashboard(pathname.startsWith("/dashboard"));
    const init = async () => {
      const user = await authUser();
      setUser(user);
    };
    init();
  }, [pathname]);

  return (
    <div className="container mx-auto">
      <div className="flex justify-between py-4 px-2">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Image src="/images/logo.svg" alt="logo" width={40} height={40} />
          <p className="text-2xl font-bold">FeedPack</p>
        </Link>
        <div className="flex md:gap-5 gap-2 items-center">
          {!isDashboard ? (
            <>
              <Link href="/#pricing">Pricing</Link>
              <Link href="/#faq">FAQ</Link>
            </>
          ) : (
            user?.isFreeUser && <Link href="/#pricing">Pricing</Link>
          )}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback>
                    {user?.name
                      .split(" ")
                      .map((val) => val.charAt(0).toUpperCase())}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40 bg-white" align="end">
                <DropdownMenuGroup>
                  <DropdownMenuItem className="cursor-pointer" asChild>
                    <Link
                      href="/dashboard"
                      className="flex gap-2 items-center w-full"
                    >
                      <BoxesIcon />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer" asChild>
                    <Link
                      href="/#pricing"
                      className="flex gap-2 items-center w-full"
                    >
                      <DollarSignIcon />
                      Pricing
                    </Link>
                  </DropdownMenuItem>
                  <NavLogout />
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={openModal}>Get Started</Button>
          )}
        </div>
      </div>
    </div>
  );
}
