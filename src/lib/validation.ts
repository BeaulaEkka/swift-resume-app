import { optional, z } from "zod";

export const optionalString = z.string().trim().optional().or(z.literal(""));

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

//workExperienceSchema
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

//educationSchema
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

export const skillsSchema = z.object({
  skills: z.array(z.string().trim().optional()),
});

export type SkillsValues = z.infer<typeof skillsSchema>;

export type EducationValues = z.infer<typeof educationSchema>;

export type WorkExperienceValues = z.infer<typeof workExperienceSchema>;

export const resumeSchema = z.object({
  ...generalInfoSchema.shape,
  ...personalInfoSchema.shape,
  ...workExperienceSchema.shape,
  ...educationSchema.shape,
  ...skillsSchema.shape,
});

export type ResumeValues = Omit<z.infer<typeof resumeSchema>, "photo"> & {
  id?: string;
  photo?: File | string | null;
};
