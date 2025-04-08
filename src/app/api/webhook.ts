import { buffer } from "micro";
import Stripe from "stripe";
import prisma from "@/lib/prisma";

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).end("Method Not Allowed");
  }

  const buf = await buffer(req);
  const sig = req.headers["stripe-signature"];

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig!, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed.", err);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object as Stripe.Checkout.Session;

      const userId = session.metadata?.userId;
      const customerId = session.customer as string;
      const subscriptionId = session.subscription as string;

      // Fetch subscription details
      const subscription = await stripe.subscriptions.retrieve(subscriptionId);

      if (userId && subscription) {
        try {
          await prisma.userSubscription.upsert({
            where: { userId },
            update: {
              stripeCustomer: customerId,
              stripeSubscriptionId: subscriptionId,
              stripePriceId: subscription.items.data[0].price.id,
              stripeCurrentPeriodEnd: new Date(
                subscription.current_period_end * 1000
              ).toISOString(),
              stripeCancelAtPeriodEnd: subscription.cancel_at_period_end,
            },
            create: {
              userId,
              stripeCustomer: customerId,
              stripeSubscriptionId: subscriptionId,
              stripePriceId: subscription.items.data[0].price.id,
              stripeCurrentPeriodEnd: new Date(
                subscription.current_period_end * 1000
              ).toISOString(),
              stripeCancelAtPeriodEnd: subscription.cancel_at_period_end,
            },
          });
          console.log("Subscription saved in DB");
        } catch (err) {
          console.error("Failed to save subscription:", err);
        }
      }
      break;

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  res.status(200).json({ received: true });
}
