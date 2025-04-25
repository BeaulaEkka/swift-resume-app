import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CreditCard, Download, LogOut, Mail, Settings } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { formatDate } from "date-fns";
import { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";
import stripe from "@/lib/stripe";
import prisma from "@/lib/prisma";
import ManageSubscriptionButton from "./success/ManageSubscriptionButton";
import GetSubscriptionButton from "./GetSubscriptionButton";



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
  console.log("Subscription", subscription);
  console.log("UserId", userId);

  const priceInfo = subscription
    ? await stripe.prices.retrieve(subscription.stripePriceId, {
        expand: ["product"],
      })
    : null;

    

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="flex w-64 flex-col justify-between bg-gray-800 p-6 text-white shadow-md">
        <div>
          <div className="mb-10 flex items-center gap-4">
            <Image
              src="/avatar.png"
              alt="User"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div>
              <p className="font-semibold">Roji Mkolwey</p>
              <p className="text-sm text-gray-300">@rodgers</p>
            </div>
          </div>

          <nav className="space-y-4">
            <Link href="/" className="flex items-center gap-2 text-gray-700">
              {/* <HomeIcon /> Home */}
            </Link>

            <Link
              href="/email"
              className="flex items-center gap-2 text-gray-700"
            >
              <Mail /> Email
            </Link>
            <Link
              href="/billing"
              className="flex items-center gap-2 font-semibold text-blue-700"
            >
              <CreditCard /> Billing
            </Link>
            <Link
              href="/account"
              className="flex items-center gap-2 text-gray-700"
            >
              <Settings /> Account
            </Link>
          </nav>
        </div>

        <Button variant="ghost" className="justify-start gap-2 text-red-600">
          <LogOut size={16} /> Log out
        </Button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <h1 className="mb-6 text-3xl font-bold">Billing</h1>

        {/* Order History */}
        <section className="mb-10">
          <h2 className="mb-1 text-xl font-semibold">Order history</h2>
          <p className="mb-4 text-sm text-gray-600">
            Manage billing information and manage receipts
          </p>

          <div className="space-y-4">
            {[1, 2, 3].map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-md bg-white p-4 shadow-sm"
              >
                <div>
                  <p className="font-medium">March 1, 2023</p>
                  <p className="text-sm text-gray-600">Invoice #{i + 1}</p>
                </div>
                <Button variant="outline" size="sm">
                  <Download size={16} className="mr-2" />
                  Download
                </Button>
              </div>
            ))}
            <Button variant="link" className="text-sm text-blue-600">
              Load more
            </Button>
          </div>
        </section>

        {/* Payment method */}
        <section className="mb-10">
          <h2 className="mb-1 text-xl font-semibold">Payment method</h2>
          <p className="mb-4 text-sm text-gray-600">
            Manage billing information and manage receipts
          </p>

          <div className="flex items-center justify-between rounded-md bg-white p-4 shadow-sm">
            <div className="flex items-center gap-4">
              <Image
                src="/visa.png"
                alt="Visa"
                width={50}
                height={30}
                className="object-contain"
              />
              <p className="text-sm text-gray-800">Visa ending in 2025</p>
            </div>
            <Button variant="outline" size="sm">
              Remove
            </Button>
          </div>
        </section>
      </main>

      {/* Subscription Panel */}
      <aside className="w-64 p-6">
        <Card className="rounded-md bg-emerald-500 p-6 text-center text-white shadow-lg">
          <p className="text-sm">Your plan</p>
          <p>
            Your Current plan is :{" "}
            <span>
              {priceInfo ? (priceInfo.product as Stripe.Product).name : "Free"}
            </span>
          </p>

          {subscription ? (
            <>
              {subscription.stripeCancelAtPeriodEnd && (
                <p className="text-sm text-red-500">
                  Your subscription will end on{" "}
                  <span className="font-semibold">
                    {formatDate(
                      subscription.stripeCurrentPeriodEnd,
                      "MMMM dd, yyyy",
                    )}
                  </span>
                </p>
              )}
              <ManageSubscriptionButton />
            </>
          ) : (
            <GetSubscriptionButton />
          )}
        </Card>
      </aside>
    </div>
  );
}
