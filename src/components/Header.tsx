// components/Header.tsx
"use client";

import { useSubscriptionLevel } from "@/app/(main)/SubscriptionLevelProvider";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Header() {
  const subscriptionLevel = useSubscriptionLevel();
  console.log("Subscription Level:", subscriptionLevel);
  console.log("Current date:", new Date().toISOString());
  

  return (
    <header className="flex items-center justify-between border-b p-4">
      <SignedIn>
        <div className="flex items-center gap-4">
          <UserButton />
          <span className="text-sm text-gray-600">
            Plan: <strong>{subscriptionLevel}</strong>
          </span>
        </div>
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </header>
  );
}
