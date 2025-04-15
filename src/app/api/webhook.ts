import { NextRequest } from "next/server";
import { headers } from "next/headers";
import { Stripe } from "stripe";
import prisma from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  //   apiVersion: "2023-10-16",
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  const body = await req.arrayBuffer(); // raw body needed for Stripe signature
  const rawBody = Buffer.from(body);
  const signature = headers().get("stripe-signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error("Webhook signature verification failed.", err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object as Stripe.Checkout.Session;

      const userId = session.metadata?.userId;
      const customerId = session.customer as string;
      const subscriptionId = session.subscription as string;

      const subscription = await stripe.subscriptions.retrieve(subscriptionId);

      if (userId && subscription) {
        try {
          await prisma.userSubscription.upsert({
            where: { userId },
            update: {
              stripeCustomerId: customerId,
              stripeSubscriptionId: subscriptionId,
              stripePriceId: subscription.items.data[0].price.id,
              stripeCurrentPeriodEnd: new Date(
                subscription.current_period_end * 1000
              ).toISOString(),
              stripeCancelAtPeriodEnd: subscription.cancel_at_period_end,
            },
            create: {
              userId,
              stripeCustomerId: customerId,
              stripeSubscriptionId: subscriptionId,
              stripePriceId: subscription.items.data[0].price.id,
              stripeCurrentPeriodEnd: new Date(
                subscription.current_period_end * 1000
              ).toISOString(),
              stripeCancelAtPeriodEnd: subscription.cancel_at_period_end,
            },
          });

          console.log("✅ Subscription saved in DB");
        } catch (err) {
          console.error("❌ Failed to save subscription:", err);
        }
      }
      break;

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 });
}

// import { buffer } from "micro";
// import type { NextApiRequest, NextApiResponse } from "next";
// import { Stripe } from "stripe";
// import prisma from "@/lib/prisma";

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: "2024-12-18.acacia",
// });

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method !== "POST") return res.status(405).end("Method Not Allowed");

//   const buf = await buffer(req);
//   const sig = req.headers["stripe-signature"] as string;

//   let event: Stripe.Event;

//   try {
//     event = stripe.webhooks.constructEvent(
//       buf,
//       sig,
//       process.env.STRIPE_WEBHOOK_SECRET!
//     );
//   } catch (err: unknown) {
//     if (err instanceof Error) {
//       console.error("Webhook signature verification failed.", err.message);
//       return new Response(`Webhook Error: ${err.message}`, { status: 400 });
//     } else {
//       console.error("Unknown error type:", err);
//       return new Response(`Webhook Error: Unknown error`, { status: 400 });
//     }
//   }

//   if (event.type === "checkout.session.completed") {
//     const session = event.data.object as Stripe.Checkout.Session;
//     const userId = session.metadata?.userId;
//     const customerId = session.customer as string;
//     const subscriptionId = session.subscription as string;

//     const subscription = await stripe.subscriptions.retrieve(subscriptionId);

//     if (userId && subscription) {
//       await prisma.userSubscription.upsert({
//         where: { userId },
//         update: {
//           stripeCustomerId: customerId,
//           stripeSubscriptionId: subscriptionId,
//           stripePriceId: subscription.items.data[0].price.id,
//           stripeCurrentPeriodEnd: new Date(
//             subscription.current_period_end * 1000
//           ).toISOString(),
//           stripeCancelAtPeriodEnd: subscription.cancel_at_period_end,
//         },
//         create: {
//           userId,
//           stripeCustomerId: customerId,
//           stripeSubscriptionId: subscriptionId,
//           stripePriceId: subscription.items.data[0].price.id,
//           stripeCurrentPeriodEnd: new Date(
//             subscription.current_period_end * 1000
//           ).toISOString(),
//           stripeCancelAtPeriodEnd: subscription.cancel_at_period_end,
//         },
//       });

//       console.log("✅ Subscription saved in DB");
//     }
//   }

//   res.json({ received: true });
// }
