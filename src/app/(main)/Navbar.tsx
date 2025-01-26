import React from 'react';
import logo from '@/assets/resume-builder-logo.png';
import Image from 'next/image';
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { CreditCard } from 'lucide-react';
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
        {/* User button and custom links */}
        <div className="flex items-center gap-4">
          <Link href="/billing" className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-900">
            <CreditCard className="w-4 h-4" />
            Billing
          </Link>
          <UserButton
            appearance={{
              elements: {
                avatarBox: {
                  height: 35,
                  width: 35,
                },
              },
            }}
          />
        </div>
      </div>
    </header>
  );
}
