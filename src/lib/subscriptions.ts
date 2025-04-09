import { env } from "@/env";
import { cache } from "react";
import prisma from "./prisma";

export type SubscriptionLevel = "free" | "pro" | "pro_plus";

export const getUserSubscriptionLevel = cache(
  async (userId: string): Promise<SubscriptionLevel> => {
    const subscription = await prisma.userSubscription.findUnique({
      where: {
        userId: userId,
      },
    });
    console.log("subscription", subscription);
    console.log("userId", userId);

    console.log("Subscription from DB:", subscription);
    console.log(
      "Expected priceId:",
      env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_PLUS_MONTHLY
    );
    console.log("Current date:", new Date().toISOString());
    console.log("End date:", subscription?.stripeCurrentPeriodEnd);
    if (
      !subscription ||
      new Date(subscription.stripeCurrentPeriodEnd).getTime() < Date.now()
    ) {
      return "free";
    }
    if (
      subscription.stripePriceId === env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_MONTHLY
    ) {
      return "pro";
    }
    if (
      subscription.stripePriceId ===
      env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_PLUS_MONTHLY
    ) {
      return "pro_plus";
    }
    throw new Error("Invalid subscriber");
  }
);
