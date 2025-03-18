import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface LoadingButtonProps {
  loading: boolean;
}
const LoadingButton = ({
  loading,
  disabled,
  className,
  children,
  ...props
}: LoadingButtonProps) => {
  return (
    <Button
      disabled={loading && disabled}
      className={cn("flex items-center gap-2", className)}
      {...props}
    >
      {loading && <Loader2 className="size-5 animate-spin" />}
      {children}
    </Button>
  );
};

export default LoadingButton;
