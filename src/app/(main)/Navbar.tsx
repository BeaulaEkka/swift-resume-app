"use client";
import React from "react";
import logo from "@/assets/resume-builder-logo.png";
import Image from "next/image";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import { CreditCard } from "lucide-react";

export default function Navbar() {
  const { theme } = useTheme();

  return (
    <header className="shadow-sm">
      <div className="mx-auto flex max-w-[80%] items-center justify-between p-3">
        {/* Logo and title */}
        <Link href="/resumes">
          <div className="flex items-center gap-2">
            <Image src={logo} alt="logo" width={35} height={35} />
            <h1 className="font-extrabold uppercase text-blue-900">
              <span>Swift</span> AI Resume Builder
            </h1>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <ThemeToggle />

          <SignedOut>
            <div className="flex gap-2">
              <SignInButton>
                <button
                  type="button"
                  className="rounded-md border-2 border-black px-4 py-2 font-semibold transition hover:bg-black hover:text-white"
                >
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton>
                <button
                  type="button"
                  className="rounded-md bg-emerald-500 px-4 py-2 font-semibold text-white transition hover:bg-emerald-700"
                >
                  Get Started
                </button>
              </SignUpButton>
            </div>
          </SignedOut>

          <SignedIn>
            <div className="flex items-center gap-2">
              <UserButton
                appearance={{
                  baseTheme: theme === "dark" ? dark : undefined,
                  elements: {
                    avatarBox: {
                      width: 40,
                      height: 40,
                    },
                  },
                }}
              >
                <UserButton.MenuItems>
                  <UserButton.Link
                    label="Billing"
                    labelIcon={<CreditCard className="size-4" />}
                    href="/billing"
                  />
                </UserButton.MenuItems>
              </UserButton>
            </div>
          </SignedIn>
        </div>
      </div>
    </header>
  );
}
