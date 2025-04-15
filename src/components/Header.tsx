import prisma from "@/lib/prisma";
import stripe from "@/lib/stripe";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Stripe from "stripe";

export default async function Header() {
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
    <header className="flex items-center justify-between border-b p-4">
      <SignedIn>
        <div className="flex items-center gap-4">
          <UserButton />
          <span className="text-sm text-gray-600">
            Plan:{" "}
            <strong>
              {priceInfo ? (priceInfo.product as Stripe.Product).name : "Free"}
            </strong>
          </span>
        </div>
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </header>
  );
}
