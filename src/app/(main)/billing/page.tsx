import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Billing",
};

export default async function page() {
  const { userId } = await auth();
  if (!userId) {
    return null;
  }
  return <main>billing</main>;
}
