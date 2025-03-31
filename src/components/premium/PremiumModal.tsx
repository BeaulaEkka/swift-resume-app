"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Check } from "lucide-react";
import { Button } from "../ui/button";
import usePremiumModal from "@/hooks/usePremiumModal";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { createCheckoutSession } from "./actions";

const premiumFeatures = ["AI tools", "Up to 3 resumes"];
const premiumPlusFeatures = ["Infinite resumes", "Design customizations"];
export default function PremiumModal() {
  const { open, setOpen } = usePremiumModal();

  const { toast } = useToast();

  const [loading,setLoading]=useState(false)

  const handlePremiumClick=async(priceId:string)=>{
    try {
      setLoading(true)
      const redirectUrl = await createCheckoutSession(priceId);
      window.location.href = redirectUrl;
      
    } catch (error) {
      console.log("error",error)
      toast({
        variant:"destructive",
        description:"Something went wrong. Please try again."
      })
    }finally{
      setLoading(false)
    }
  }
  return (
    <Dialog open={open} onOpenChange={()=>{if(!loading)setOpen(open)}}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Resume Builder Premium</DialogTitle>
          <DialogDescription>
            <span>Get a premium subscription to unlock more features</span>{" "}
          </DialogDescription>
          <div className="mt-8 flex items-center justify-center text-center">
            <div className="flex w-1/2 flex-col space-y-5">
              <h3 className="font-bold text-gray-900">Premium</h3>
              <ul className="list-inside space-y-2">
                {premiumFeatures.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="size-4 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button onClick={()=>handlePremiumClick(process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_MONTHLY!)} disabled={loading}>Get Premium</Button>
            </div>
            <div className="border-1 mx-6 border" />
            <div className="flex w-1/2 flex-col space-y-5">
              <h3 className="bg-gradient-to-r from-amber-500 to-rose-500 bg-clip-text font-bold text-transparent">
                Premium Plus
              </h3>
              <ul className="list-inside space-y-2">
                {premiumPlusFeatures.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="size-4 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button variant="premium" onClick={()=>handlePremiumClick(process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_PLUS_MONTHLY!)} disabled={loading}>Get Premium plus</Button>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
