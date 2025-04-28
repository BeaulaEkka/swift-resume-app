"use client";

import { ResumeServerData } from "@/lib/types";
import { formatDate } from "date-fns";
import Link from "next/link";
import { mapToResumeValues } from "@/lib/utils";
import ResumePreview from "@/components/ResumePreview";
import { useRef, useState, useTransition } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical, Printer, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { deleteResume } from "./actions";
import { Dialog, DialogTitle } from "@radix-ui/react-dialog";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import LoadingButton from "@/components/LoadingButton";
import { useReactToPrint } from "react-to-print";
import { LayoutType } from "../editor/layoutStyles/layoutStyles";
interface ResumeItemProps {
  resume: ResumeServerData;
}

export default function ResumeItem({ resume }: ResumeItemProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const layoutType = (resume.layout || LayoutType.DEFAULT) as LayoutType;

  const reactToPrintFn = useReactToPrint({
    contentRef,
    documentTitle: resume.title || "resume",
  });

  const wasUpdated = resume.updatedAt !== resume.createdAt;
  return (
    <div className="group relative rounded-lg border-transparent p-2 hover:border-gray-100 hover:bg-gray-50 hover:shadow-sm">
      <MoreMenu resumeId={resume.id} onPrintClick={reactToPrintFn} />
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
              contentRef={contentRef}
              className="overflow-hidden shadow-sm transition-shadow group-hover:shadow-lg"
              selectedLayout={layoutType}
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
  onPrintClick: () => void;
}

function MoreMenu({ resumeId, onPrintClick }: MoreMenuProps) {
  const [showDeleteConformation, setShowDeleteConformation] = useState(false);

  return (
    <>
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
          <DropdownMenuItem
            className="flex items-center gap-2"
            onClick={onPrintClick}
          >
            <Printer className="size-4" />
            Print
          </DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteConformationDialog
        open={showDeleteConformation}
        resumeId={resumeId}
        onOpenChange={setShowDeleteConformation}
      />
    </>
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

  async function handleDelete() {
    startTransition(async () => {
      try {
        await deleteResume(resumeId);
        onOpenChange(false);
      } catch (error) {
        console.log(error);
        toast({
          variant: "destructive",
          description: "Something went wrong.Please try again",
        });
      }
    });
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Resume?</DialogTitle>
          <DialogDescription>
            This resume will be permamently deleted from your account.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <LoadingButton
            variant="destructive"
            loading={isPending}
            onClick={handleDelete}
          >
            Delete
          </LoadingButton>
          <Button variant="secondary" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
