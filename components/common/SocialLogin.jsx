"use client";
import React, { useCallback, useEffect, useState } from "react";
import eventBus from "@/utils/event";
import { Button } from "../ui/button";
import Image from "next/image";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { getItem, setItem } from "@/utils";
import { authUser } from "@/services/nextAuth";

export default function SocialLogin() {
  const [open, setOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(true);

  const socialLogin = () => {
    if (!getItem("socialLogin")) {
      setItem("socialLogin", window.location.href);
    }
    window.open(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/social-login/google`,
      "_self"
    );
  };
  const setAuth = useCallback(async () => {
    try {
      const user = await authUser();
      setLoggedIn(!!user);
    } catch (error) {}
  }, []);

  useEffect(() => {
    setAuth();
    eventBus.on("loginModal", () => setOpen(true));
    return () => eventBus.off("loginModal");
  }, [setAuth]);

  return (
    <>
      {!loggedIn && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogTitle></DialogTitle>
            <div>
              <h1 className="text-3xl font-bold text-gray-800 text-center">
                Login on FeedPack
              </h1>
              <div className="flex flex-col gap-2 my-4">
                <Button onClick={socialLogin} variant="default">
                  <Image
                    src="/icons/google.svg"
                    alt="google"
                    width={20}
                    height={20}
                  />
                  Sign in with google
                </Button>
              </div>
              <p className="text-sm text-gray-600 text-center md:w-2/3 mx-auto">
                We use {`"Feedpack"`} to collect feedback from users like you.
                Sign up to post and vote.
              </p>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
