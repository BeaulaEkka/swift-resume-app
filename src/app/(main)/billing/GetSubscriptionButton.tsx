import { Button } from "@/components/ui/button";
import usePremiumModal from "@/hooks/usePremiumModal";
import React from "react";

export default function GetSubscriptionButton() {
  const premiumModal = usePremiumModal();
  return (
    <Button variant="premium" onClick={() => premiumModal.setOpen(true)}>
      Get Premium Subscription
    </Button>
  );
}
