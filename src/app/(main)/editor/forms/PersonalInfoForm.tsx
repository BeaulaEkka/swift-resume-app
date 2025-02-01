"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { personalInfoSchema, PersonalInfoValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

export default function PersonalInfoForm() {
  const form = useForm<PersonalInfoValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      jobTitle: "",
      city: "",
      country: "",
      email: "",
      phone: "",
    },
  });
  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">Personal Info</h2>
        <p className="text-sm text-muted-foreground">Tell us about yourself</p>
        <Form {...form}>
          <form>
            <FormField
              control={form.control}
              name="photo"
              render={({ field: { value, ...fieldValues } }) => (
                <FormItem>
                  <FormLabel>Your Photo</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      {...fieldValues}
                      accept="images/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        fieldValues.onChange(file);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </div>
  );
}
