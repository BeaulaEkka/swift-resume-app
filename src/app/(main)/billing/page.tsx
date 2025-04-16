import prisma from "@/lib/prisma";
import stripe from "@/lib/stripe";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import Stripe from "stripe";
import GetSubscriptionButton from "./GetSubscriptionButton";
import { formatDate } from "date-fns";

export const metadata: Metadata = {
  title: "Billing",
};

export default async function page() {
  const { userId } = await auth();
  if (!userId) {
    return null;
  }
  const subscription = await prisma.userSubscription.findUnique({
    where: {
      userId,
    },
  });

  const priceInfo = subscription
    ? await stripe.prices.retrieve(subscription.stripePriceId, {
        expand: ["product"],
      })
    : null;

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-3 py-6">
      <p>
        Your Current plan is :{" "}
        <span>
          {priceInfo ? (priceInfo.product as Stripe.Product).name : "Free"}
        </span>
      </p>
      {subscription ? (
        <>
          {subscription.stripeCancelAtPeriodEnd && (
            <p>
              Your subscription will end on{" "}
              {formatDate(subscription.stripeCurrentPeriodEnd, "MMM dd,yyyy")}
            </p>
          )}
        </>
      ) : (
        <GetSubscriptionButton />
      )}
    </main>
  );
}
