"use server";

import stripe from "@/lib/stripe";
import { currentUser } from "@clerk/nextjs/server";

export async function createCustomerPortalSession() {
  const user = await currentUser();
  if (!user) {
    throw new Error("User not found");
  }

  const stripeCustomerId = user.publicMetadata.stripeCustomer as
    | string
    | undefined;
  if (!stripeCustomerId) {
    throw new Error("Stripe customer ID not found");
  }

  const session = await stripe.billingPortal.sessions.create({
    customer: stripeCustomerId,
    return_url: process.env.NEXT_PUBLIC_SITE_URL,
  });
  if (!session.url) {
    throw new Error("Session URL not found");
  }
  return session.url;
}
