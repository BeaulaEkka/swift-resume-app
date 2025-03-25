"use client";

import { ResumeServerData } from "@/lib/types";
import { formatDate } from "date-fns";
import Link from "next/link";
import { mapToResumeValues } from "@/lib/utils";
import ResumePreview from "@/components/ResumePreview";
import { useState, useTransition } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
interface ResumeItemProps {
  resume: ResumeServerData;
}
export default function ResumeItem({ resume }: ResumeItemProps) {
  const wasUpdated = resume.updatedAt !== resume.createdAt;
  return (
    <div className="group relative rounded-lg border-transparent p-2 hover:border-gray-100 hover:bg-gray-50 hover:shadow-sm">
      <MoreMenu resumeId={resume.id} />
      <div>
        <Link
          href={`/editor?/resumeId=${resume.id}`}
          className="max-h-30 inline-block w-full pb-4 text-center"
        >
          <div className="flex min-h-[40px] flex-col items-center justify-center">
            <p className="line-clamp-1 flex-1 font-semibold capitalize">
              {resume.title || "No title"}
            </p>
            <p className="line-clamp-1 flex-1 text-gray-500">
              {resume.description || "No description"}
            </p>
          </div>
          <p className="text-xs text-muted-foreground">
            {wasUpdated ? "Updated" : "Created"} on{" "}
            {formatDate(resume.updatedAt, "MMM d, yyyy h:MM a")}
          </p>
        </Link>
        <div className="shadow-md">
          <Link
            href={`editor?resumeId=${resume.id}`}
            className="relative inline-block w-full"
          >
            <ResumePreview
              resumeData={mapToResumeValues(resume)}
              className="overflow-hidden shadow-sm transition-shadow group-hover:shadow-lg"
            />
            <div className="from-white-transparent absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t" />
          </Link>
        </div>
      </div>
    </div>
  );
}

interface MoreMenuProps {
  resumeId: string;
}

function MoreMenu({ resumeId }: MoreMenuProps) {
  const [showDeleteConformation, setShowDeleteConformation] = useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0.5 top-0.5 opacity-0 transition-opacity group-hover:opacity-100"
        >
          <MoreVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex items-center gap-2"
          onClick={() => setShowDeleteConformation(true)}
        >
          <Trash2 className="size-4" />
          Delete
        </DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

interface DeleteConformationDialogProps {
  resumeId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function DeleteConformationDialog({
  resumeId,
  open,
  onOpenChange,
}: DeleteConformationDialogProps) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
}
