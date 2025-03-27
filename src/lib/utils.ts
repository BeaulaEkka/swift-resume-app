import { clsx, ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ResumeServerData } from "./types";
import { ResumeValues } from "./validation";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function fileReplacer(key: unknown, value: unknown) {
  return value instanceof File
    ? {
        name: value.name,
        size: value.size,
        type: value.type,
        lastModified: value.lastModified,
      }
    : value;
}

export function mapToResumeValues(data: ResumeServerData): ResumeValues {
  return {
    id: data.id,
    title: data.title || undefined,
    description: data.description || undefined,
    photo: data.photoUrl || undefined,
    firstName: data.firstName || undefined,
    lastName: data.lastName || undefined,
    jobTitle: data.jobTitle || undefined,
    city: data.city || undefined,
    country: data.country || undefined,
    email: data.email || undefined,
    phone: data.phone || undefined,
    workExperiences: data.workExperiences.map((exp) => ({
      position: exp.position || undefined,
      company: exp.company || undefined,
      // startDate: exp.startDate
      //   ? exp.startDate.toISOString().split("T")[0]
      //   : null,
      startDate: exp.startDate
        ? typeof exp.startDate === "string"
          ? exp.startDate // Keep as string if already formatted
          : new Date(exp.startDate).toISOString().split("T")[0] // Convert only if Date object
        : null,
      // endDate: exp.endDate ? exp.endDate.toISOString().split("T")[0] : null,
      endDate: exp.endDate
        ? typeof exp.endDate === "string"
          ? exp.endDate
          : new Date(exp.endDate).toISOString().split("T")[0]
        : null,
      description: exp.description || undefined,
    })),
    educations: data.education.map((edu) => ({
      institution: edu.institution || undefined,
      degree: edu.degree || undefined,
      // startDate: edu.startDate
      //   ? edu.startDate.toISOString().split("T")[0]
      //   : null,
      // endDate: edu.endDate ? edu.endDate.toISOString().split("T")[0] : null,
      startDate: edu.startDate
        ? typeof edu.startDate === "string"
          ? edu.startDate
          : new Date(edu.startDate).toISOString().split("T")[0]
        : null,
      endDate: edu.endDate
        ? typeof edu.endDate === "string"
          ? edu.endDate
          : new Date(edu.endDate).toISOString().split("T")[0]
        : null,
    })),
    // skills: data.skills,
    skills: data.skills?.filter((skill) => skill != null) || [],
    borderStyle: data.borderStyle,
    colorHex: data.colorHex,
    summary: data.summary || undefined,
  };
}
