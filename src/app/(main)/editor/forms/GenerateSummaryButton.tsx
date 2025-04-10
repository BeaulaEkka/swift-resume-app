import LoadingButton from "@/components/LoadingButton";
import { useToast } from "@/hooks/use-toast";
import { ResumeValues } from "@/lib/validation";
import { WandSparklesIcon } from "lucide-react";
import { useState } from "react";
import { generateSummary } from "./actions";
import { useSubscriptionLevel } from "../../SubscriptionLevelProvider";
import usePremiumModal from "@/hooks/usePremiumModal";
import { canUseAITools } from "@/lib/permissions";

interface GenerateSummaryButtonProps {
  resumeData: ResumeValues;
  onSummaryGenerated: (summary: string) => void;
}
export default function GenerateSummaryButton({
  resumeData,
  onSummaryGenerated,
}: GenerateSummaryButtonProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const subscription = useSubscriptionLevel();
  const premiumMode = usePremiumModal();

  async function handleClick() {
    if (!canUseAITools(subscription)) {
      premiumMode.setOpen(true);
      return;
    }
    if (!resumeData) {
      toast({
        variant: "destructive",
        description: "Resume data is missing. Please try again.",
      });
      return;
    }
    try {
      setLoading(true);
      const aiResponse = await generateSummary(resumeData);
      onSummaryGenerated(aiResponse);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        description: "Something went wrong. Please try again",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <LoadingButton
      type="button"
      variant="outline"
      loading={loading}
      onClick={handleClick}
      disabled={loading}
      aria-label="Generate AI Summary"
    >
      <WandSparklesIcon className="size-4" />
      Generate Summary (AI)
    </LoadingButton>
  );
}
