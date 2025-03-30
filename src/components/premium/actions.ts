"use server";

import stripe from "@/lib/stripe";
import { currentUser } from "@clerk/nextjs/server";

export async function createCheckoutSession(priceId: string) {
  const user = await currentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const session = await stripe.checkout.sessions.create({
    line_items: [{ price: priceId, qualtity: 1 }],
    mode: "subscription",
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/billing/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/billing`,
    customerr_email: user.emailAddresses[0].emailAddress,
    subscription_data: {
      metadata: {
        user_id: user.id,
      },
    },
    custom_text: {
      terms_of_service_acceptance: {
        message: `I have read AI Resume Builder's [terms of server]()`,
      },
    },
  });
}
