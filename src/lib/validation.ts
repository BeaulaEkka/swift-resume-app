import { LayoutType } from "@/app/(main)/editor/layoutStyles/layoutStyles";
import { StaticImageData } from "next/image";
import { z } from "zod";

export const optionalString = z
  .string()
  .trim()
  .optional()
  .or(z.literal(""))
  .or(z.null());

//generalSchema
export const generalInfoSchema = z.object({
  title: optionalString,
  description: optionalString,
});

export type GeneralInfoValues = z.infer<typeof generalInfoSchema>;

//personalInfoSchema
export const personalInfoSchema = z.object({
  photo: z
    .custom<File | undefined>()
    .refine(
      (file) =>
        !file || (file instanceof File && file.type.startsWith("image/")),
      "It must be an image file"
    )
    .refine(
      (file) => !file || file.size <= 1024 * 1024 * 4,
      "File must be less than 4MB"
    ),
  firstName: optionalString,
  lastName: optionalString,
  jobTitle: optionalString,
  email: optionalString,
  phone: optionalString,
  city: optionalString,
  country: optionalString,
});

export type PersonalInfoValues = z.infer<typeof personalInfoSchema>;

//---------------workExperienceSchema
export const workExperienceSchema = z.object({
  workExperiences: z
    .array(
      z.object({
        position: optionalString,
        company: optionalString,
        startDate: optionalString,
        endDate: optionalString,
        description: optionalString,
      })
    )
    .optional(),
});
export type WorkExperienceValues = z.infer<typeof workExperienceSchema>;

//---------------singleworkExperience
export type WorkExperience = NonNullable<
  z.infer<typeof workExperienceSchema>["workExperiences"]
>[number];

//----------------educationSchema
export const educationSchema = z.object({
  educations: z
    .array(
      z.object({
        degree: optionalString,
        institution: optionalString,
        startDate: optionalString,
        endDate: optionalString,
      })
    )
    .optional(),
});

export type EducationValues = z.infer<typeof educationSchema>;

//----------------skillsSchema
export const skillsSchema = z.object({
  skills: z.array(z.string().trim().optional()),
});

export type SkillsValues = z.infer<typeof skillsSchema>;

//----------------summarySchema
export const summarySchema = z.object({ summary: optionalString });
export type SummaryValues = z.infer<typeof summarySchema>;

//----------------resumeSchema
// export const resumeSchema = z.object({
//   ...generalInfoSchema.shape,
//   ...personalInfoSchema.shape,
//   ...workExperienceSchema.shape,
//   ...educationSchema.shape,
//   ...skillsSchema.shape,
//   ...summarySchema.shape,
//   colorHex: optionalString,
//   borderStyle: optionalString,
// });
export const resumeSchema = 
generalInfoSchema
  .merge(personalInfoSchema)
  .merge(workExperienceSchema)
  .merge(educationSchema)
  .merge(skillsSchema)
  .merge(summarySchema)
  .extend({
    colorHex: optionalString,
    borderStyle: optionalString,
  })
  .extend({
    colorHex: optionalString,
    borderStyle: optionalString,
    layout: z.nativeEnum(LayoutType).optional(), // 👈 add this line
  });

export type ResumeValues = Omit<z.infer<typeof resumeSchema>, "photo"> & {
  id?: string;
  photo?: File | string | StaticImageData | null;
};

//----------------generateSummarySchema
export const generateSummarySchema = z.object({
  jobTitle: optionalString,
  ...workExperienceSchema.shape,
  ...educationSchema.shape,
  ...skillsSchema.shape,
});

export type GenerateSummaryInput = z.infer<typeof generalInfoSchema>;

//----------------generateExperienceSchema
export const generateWorkExperiencesSchema = z.object({
  description: z
    .string()
    .trim()
    .min(1, "Required") //if left empty
    .min(20, "Must be atleast 20 characters"),
});

export type GenerateWorkExperienceInput = z.infer<
  typeof generateWorkExperiencesSchema
>;
