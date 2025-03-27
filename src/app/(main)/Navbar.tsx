"use client";
import React from "react";
import logo from "@/assets/resume-builder-logo.png";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { CreditCard } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

export default function Navbar() {
  const { theme } = useTheme();

  return (
    <header className="shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between p-3">
        {/* Logo and title */}
        <Link href="/resumes">
          <div className="flex items-center gap-2">
            <Image src={logo} alt="logo" width={35} height={35} />
            <h1 className="font-extrabold uppercase text-blue-900">
              <span>Swift</span> AI Resume Builder
            </h1>
          </div>
        </Link>
        <ThemeToggle />
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
    </header>
  );
}
