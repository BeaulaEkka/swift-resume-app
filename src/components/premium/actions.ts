"use server";

import { env } from "@/env";
import stripe from "@/lib/stripe";
import { currentUser } from "@clerk/nextjs/server";

export async function createCheckoutSession(priceId: string) {
  const user = await currentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  //because there could be similar email addresses in the database, we need to use the userId to identify the user
  const stripeCustomerId = user.publicMetadata.stripeCustomerId as
    | string
    | undefined;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card", "ideal"],
    line_items: [{ price: priceId, quantity: 1 }],
    mode: "subscription",
    success_url: `${env.NEXT_PUBLIC_BASE_URL}/billing/success`,
    cancel_url: `${env.NEXT_PUBLIC_BASE_URL}/billing`,
    customer: stripeCustomerId,
    //we cant use both email and customerId in the same request, so we need to check if the customerId is present or not
    customer_email: stripeCustomerId
      ? undefined
      : user.emailAddresses[0].emailAddress,

    metadata: {
      userId: user.id,
    },
    subscription_data: {
      metadata: {
        userId: user.id,
      },
    },
    client_reference_id: user.id,
    custom_text: {
      terms_of_service_acceptance: {
        message: `I have read and understood AI Resume Builder's [Terms of Service](${env.NEXT_PUBLIC_BASE_URL}/tos) and agree to them`,
      },
    },
    consent_collection: {
      terms_of_service: "required",
    },
  });
  if (!session.url) {
    throw new Error("Failed to create checkout session");
  }
  return session.url;
}
