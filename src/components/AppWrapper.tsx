// components/AppWrapper.tsx
"use client";

import { useUser } from "@clerk/nextjs";

import { SubscriptionLevel } from "@/lib/subscriptions";
import SubscriptionLevelProvider from "@/app/(main)/SubscriptionLevelProvider";


export default function AppWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isSignedIn, user } = useUser();

  const subscriptionLevel =
    isSignedIn && user?.publicMetadata?.subscriptionLevel
      ? (user.publicMetadata.subscriptionLevel as SubscriptionLevel)
      : "free"; // fallback

  return (
    <SubscriptionLevelProvider userSubscriptionLevel={subscriptionLevel}>
      {children}
    </SubscriptionLevelProvider>
  );
}
