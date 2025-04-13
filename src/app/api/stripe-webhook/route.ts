import prisma from "@/lib/prisma";
import { clerkClient } from "@clerk/nextjs/server";
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
    //return new Response("Webhook received", { status: 200 });
  } catch (error) {
    console.error(`Webhook Error: ${error}`);
    return NextResponse.json({ error: "Webhook Error" }, { status: 400 });
  }

  async function handleSessionCompleted(session: Stripe.Checkout.Session) {
    console.log("Session completed:", session);
    // Here you can handle the session completion, e.g., update your database
    const userId = session.metadata?.userId;

    if (!userId) {
      console.error("User ID not found in session metadata");
      return;
    }

    if (!session.customer || !session.subscription) {
      console.error("Missing customer or subscription in session");
      return;
    }
    //to store the metadata in the user object in clerk
    try {
      const client = await clerkClient();
      await client.users.updateUserMetadata(userId, {
        privateMetadata: {
          stripeCustomerId: session.customer as string,
          stripeSubscriptionId: session.subscription as string,
        },
        publicMetadata: {
          subscribed: true,
        },
      });
      console.log("User metadata updated in Clerk.");
    } catch (err) {
      console.error("Failed to update user metadata in Clerk:", err);
    }
  }

  async function handleSubscriptionCreatedOrUpdated(subscriptionId: string) {
    console.log("Subscription created or updated:", subscriptionId);
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    if (
      subscription.status === "active" ||
      subscription.status === "trialing" ||
      subscription.status === "past_due"
    ) {
      await prisma.userSubscription.upsert({
        where: {
          userId: subscription.metadata.userId,
        },

        create: {
          userId: subscription.metadata.userId,
          stripeSubscriptionId: subscription.id,
          stripeCustomerId: subscription.customer as string,
          stripePriceId: subscription.items.data[0].price.id,
          stripeCurrentPeriodEnd: new Date(
            subscription.current_period_end * 1000
          ),
          stripeCancelAtPeriodEnd: subscription.cancel_at_period_end,
        },
        update: {
          stripePriceId: subscription.items.data[0].price.id,
          currentPeriodEnd: new Date(subscription.current_period_end * 1000),
          stripeCurrentPeriodEnd: new Date(
            subscription.current_period_end * 1000
          ),
          stripeCancelAtPeriodEnd: subscription.cancel_at_period_end,
        },
      });
    } else {
      await prisma.userSubscription.deleteMany({
        where: {
          stripeCustomer: subscription.customer as string,
        },
      });
    }
  }

  async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
    await prisma.userSubscription.deleteMany({
      where: {
        stripeCustomer: subscription.customer as string,
      },
    });
  }
}
