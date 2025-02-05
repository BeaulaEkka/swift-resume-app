import { EditorFormProps } from "@/lib/types";
import { educationSchema, EducationValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { GripHorizontal } from "lucide-react";
import React, { useEffect } from "react";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";

export default function EducationForm({
  resumeData,
  setResumeData,
}: EditorFormProps) {
  const form = useForm<EducationValues>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      educations: resumeData.educations || [],
    },
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;

      setResumeData({
        ...resumeData,
        educations: values.educations?.filter((edu) => edu !== undefined) || [],
      });
    });
    return unsubscribe;
  }, [form, resumeData, setResumeData]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "educations",
  });
  return <div></div>;
}

interface EducationItemProps {
  form: UseFormReturn<EducationValues>;
  index: number;
  remove: (index: number) => void;
}
//education Item
function EducationItem({ form, index, remove }: EducationItemProps) {
  <div className="space-y-3 rounded-md border bg-background p-8">
    <div className="flex items-center justify-between gap-2 p-1">
      <span className="flex items-center font-semibold capitalize">
        Education {index + 1}
      </span>
      <GripHorizontal className="size-5 cursor-grab text-muted-foreground" />
    </div>
  </div>;
}
