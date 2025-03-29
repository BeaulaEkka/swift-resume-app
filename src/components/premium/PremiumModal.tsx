import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
              <div className="mt-8 flex items-center justify-center text-center font-bold">
                <div className="flex w-1/2 flex-col space-y-5">
                  <h3>Premium</h3>
                  <ul>
                    {premiumFeatures.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
                <div className="border-1 mx-6" />
                <div className="flex w-1/2 flex-col space-y-5 bg-gradient-to-r from-amber-500 to-rose-500 bg-clip-text text-transparent">
                  Premium Plus
                </div>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
