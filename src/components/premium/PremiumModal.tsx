import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Check, CheckCheck } from "lucide-react";
import { Button } from "../ui/button";

const premiumFeatures = ["AI tools", "Up to 3 resumes"];
const premiumPlusFeatures = ["Infinite resumes", "Design customizations"];
export default function PremiumModal() {
  return (
    <Dialog open>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Resume Builder Premium</DialogTitle>
          <DialogDescription>
            <div>
              <p>Get a premium subscription to unlock more features</p>
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
                  <Button>Get Premium</Button>
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
                  <Button variant="premium">Get Premium plus</Button>
                </div>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
