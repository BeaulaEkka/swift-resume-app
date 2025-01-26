'use client'
import React from 'react';
import logo from '@/assets/resume-builder-logo.png';
import Image from 'next/image';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { CreditCard, DotIcon } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function Navbar() {
  return (
    <header className="shadow-sm">
      <div className="max-w-7xl mx-auto p-3 flex items-center justify-between">
        {/* Logo and title */}
        <Link href="/resumes">
          <div className="flex items-center gap-2">
            <Image src={logo} alt="logo" width={35} height={35} />
            <h1 className="font-extrabold text-blue-900 uppercase">
              <span>Swift</span> AI Resume Builder
            </h1>
          </div>
        </Link>
<ThemeToggle/>
       <UserButton
            appearance={{
            //   baseTheme: theme === "dark" ? dark : undefined,
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
