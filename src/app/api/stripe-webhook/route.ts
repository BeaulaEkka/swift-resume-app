import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-12-18.acacia",
});

export async function POST(req: Request) {
  const signature = req.headers.get("stripe-signature") || "";
  const payload = await req.text();

  if (!signature) {
    return NextResponse.json(
      { error: "Missing Stripe signature" },
      { status: 400 }
    );
  }

  try {
    const event = stripe.webhooks.constructEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ""
    );
    console.log(`Webhook event received: ${event.type}`, event.data.object);

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
        await handleSessionCompleted(event.data.object);
        break;
      case "customer.subscription.created":
      case "customer.subscription.updated":
        await handleSubscriptionCreatedOrUpdated(event.data.object.id);
        break;
      case "customer.subscription.deleted":
        await handleSubscriptionDeleted(event.data.object);
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error(`Webhook Error: ${error}`);
    return NextResponse.json({ error: "Webhook Error" }, { status: 400 });
  }

  async function handleSessionCompleted(session: Stripe.Checkout.Session) {
    console.log("Session completed:", session);
    // Here you can handle the session completion, e.g., update your database
    const userId = session.metadata.userId;
  }

  async function handleSubscriptionCreatedOrUpdated(subscriptionId: string) {
    console.log("Subscription created or updated:", subscriptionId);
    // Here you can handle the subscription creation or update, e.g., update your database
  }

  async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
    console.log("Subscription deleted:", subscription.id);
    // Here you can handle the subscription deletion, e.g., update your database
  }
}
