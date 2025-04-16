"use client";

import LoadingButton from "@/components/LoadingButton";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { createCustomerPortalSession } from "../actions";

export default function ManageSubscriptionButton() {
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);

  async function handleClick() {
    try {
      setLoading(true);
      const redirectUrl = await createCustomerPortalSession();
      window.location.href = redirectUrl;
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "An error occurred while managing your subscription.",
        variant: "destructive",
      });

      console.error("Error managing subscription:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <LoadingButton onClick={handleClick} loading={loading}>
      Manage Subscription
    </LoadingButton>
  );
}
