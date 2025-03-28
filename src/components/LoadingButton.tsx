import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface LoadingButtonProps {
  loading: boolean;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  variant?:
    | "outline"
    | "default"
    | "destructive"
    | "secondary"
    | "ghost"
    | "link"
    | "premium"
    | null;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
const LoadingButton = ({
  loading,
  disabled,
  className,
  children,
  type = "button",
  variant,
  onClick,
  ...props
}: LoadingButtonProps) => {
  return (
    <Button
      type={type}
      variant={variant}
      onClick={onClick}
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
