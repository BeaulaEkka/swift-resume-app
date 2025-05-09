import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Textarea } from "@/components/ui/textarea";
import { EditorFormProps } from "@/lib/types";
import { skillsSchema, SkillsValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function SkillsForm({
  resumeData,
  setResumeData,
}: EditorFormProps) {
  const form = useForm<SkillsValues>({
    resolver: zodResolver(skillsSchema),
    defaultValues: { skills: resumeData.skills || [] },
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;

      setResumeData({
        ...resumeData,
        skills:
          values.skills
            ?.filter((skill) => skill !== undefined)
            .map((skill) => skill.trim())
            .filter((skill) => skill !== "") || [],
      });
    });
    return unsubscribe;
  }, [form, resumeData, setResumeData]);

  //   const { fields, append, remove } = useFieldArray({
  //     control: form.control,
  //     name: "workExperiences",
  //   });
  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="5 space-y-1 text-center">
        <h2 className="text-semibold text-2xl">Skills</h2>
        <p className="text-sm text-muted-foreground">What are you goot at?</p>
      </div>
      <Form {...form}>
        <form action="">
          <FormField
            control={form.control}
            name="skills"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Skills</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="eg.React.js, Node etc"
                    // onChange={(e) => {
                    //   const skills = e.target.value.split(",");
                    //   field.onChange(skills);
                    // }}
                    onChange={(e) => {
                      field.onChange(
                        e.target.value.split(",").map((skill) => skill.trim()),
                      );
                    }}
                    value={field.value ? field.value.join(", ") : ""}
                  />
                </FormControl>
                <FormDescription>
                  Seperate each skill with a comma.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}

// function SkillsItem();
