import { useToast } from "@/hooks/use-toast";
import { ResumeValues } from "@/lib/validation";
import { useState } from "react";

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

  async function handleClick(){}
  return <div></div>;
}
