"use server";

import { canCreateResume, canUseCustomizations } from "@/lib/permissions";
import prisma from "@/lib/prisma";
import { getUserSubscriptionLevel } from "@/lib/subscriptions";
import { resumeSchema, ResumeValues } from "@/lib/validation";
import { auth } from "@clerk/nextjs/server";
import { del, put } from "@vercel/blob";
import path from "path";

export async function saveResume(values: ResumeValues) {
  const { id } = values;

  const { photo, workExperiences, educations, ...resumeValues } =
    resumeSchema.parse(values);

  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }
  //Todo:check resume count for non-premium users
  const subscriptionLevel = await getUserSubscriptionLevel(userId);
  if (!id) {
    const resumeCount = await prisma.resume.count({
      where: {
        userId: userId,
      },
    });
    if (!canCreateResume(subscriptionLevel, resumeCount)) {
      throw new Error(
        "Maximum resume count reached for this subscription Level"
      );
    }
  }

  const existingResume = id
    ? await prisma.resume.findUnique({ where: { id, userId } })
    : null;

  if (id && !existingResume) {
    throw new Error("Resume not found");
  }

  const hasCustomizations =
    (resumeValues.borderStyle &&
      resumeValues.borderStyle !== existingResume?.borderStyle) ||
    (resumeValues.colorHex &&
      resumeValues.colorHex !== existingResume?.colorHex);

  // if (hasCustomizations) {
  //   await prisma.resume.updateMany({
  //     where: {
  //       userId,
  //       id: {
  //         not: id,
  //       },
  //     },
  //     data: {
  //       borderStyle: null,
  //       colorHex: null,
  //     },
  //   });
  // }

  if (hasCustomizations && !canUseCustomizations(subscriptionLevel)) {
    throw new Error(
      "Customizations are not available for this subscription level"
    );
  }

  let newPhotoUrl: string | undefined | null = undefined;

  if (photo instanceof File) {
    if (existingResume?.photoUrl) {
      await del(existingResume.photoUrl);
    }

    const blob = await put(`resume_photos/${path.extname(photo.name)}`, photo, {
      access: "public",
    });

    newPhotoUrl = blob.url;
  } else if (photo === null) {
    if (existingResume?.photoUrl) {
      await del(existingResume.photoUrl);
    }
    newPhotoUrl = null;
  }
  const updatedSkills = resumeValues.skills.filter(
    (skill) => skill !== undefined
  );
  if (id) {
    return prisma.resume.update({
      where: { id },
      data: {
        ...resumeValues,
        skills: updatedSkills.length > 0 ? updatedSkills : [],
        photoUrl: newPhotoUrl,
        workExperiences: {
          deleteMany: {},
          create: workExperiences?.map((exp) => ({
            ...exp,
            startDate: exp.startDate
              ? new Date(exp.startDate).toISOString()
              : undefined,
            endDate: exp.endDate
              ? new Date(exp.endDate).toISOString()
              : undefined,
          })),
        },
        educations: {
          deleteMany: {},
          create: educations?.map((edu) => ({
            ...edu,
            startDate: edu.startDate
              ? new Date(edu.startDate).toISOString()
              : undefined,
            endDate: edu.endDate
              ? new Date(edu.endDate).toISOString()
              : undefined,
          })),
        },
        updatedAt: new Date(),
      },
    });
  } else {
    return prisma.resume.create({
      data: {
        ...resumeValues,
        skills: [],
        userId,
        photoUrl: newPhotoUrl,
        workExperiences: {
          create: workExperiences?.map((exp) => ({
            ...exp,
            startDate: exp.startDate
              ? new Date(exp.startDate).toISOString()
              : undefined,
            endDate: exp.endDate
              ? new Date(exp.endDate).toISOString()
              : undefined,
          })),
        },
        educations: {
          create: educations?.map((edu) => ({
            ...edu,
            startDate: edu.startDate
              ? new Date(edu.startDate).toISOString()
              : undefined,
            endDate: edu.endDate
              ? new Date(edu.endDate).toISOString()
              : undefined,
          })),
        },
      },
    });
  }
}
