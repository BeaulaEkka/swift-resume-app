// "use server";

// import prisma from "@/lib/prisma";
// import { resumeSchema, ResumeValues } from "@/lib/validation";
// import { auth } from "@clerk/nextjs/server";
// import { del, put } from "@vercel/blob";
// import path from "path";

// export async function saveResume(values: ResumeValues) {
//   const { id } = values;
//   console.log("received values", values);

//   const {
//     photo,
//     workExperiences = [],
//     educations = [],
//     ...resumeValues
//   } = resumeSchema.parse(values);

//   const { userId } = await auth();

//   if (!userId) {
//     throw new Error("User not authenticated");
//   }

//   // TODO: Check resume count for non-premium users

//   const existingResume = id
//     ? await prisma.resume.findUnique({ where: { id, userId } })
//     : null;

//   if (id && !existingResume) {
//     throw new Error("Resume not found");
//   }

//   let newPhotoUrl: string | undefined | null = undefined;

//   if (photo instanceof File) {
//     if (existingResume?.photoUrl) {
//       await del(existingResume.photoUrl);
//     }

//     const blob = await put(`resume_photos/${path.extname(photo.name)}`, photo, {
//       access: "public",
//     });

//     newPhotoUrl = blob.url; // Fixed assignment
//   } else if (photo === null) {
//     if (existingResume?.photoUrl) {
//       await del(existingResume.photoUrl);
//     }
//     newPhotoUrl = null;
//   }

//   if (id) {
//     return await prisma.resume.update({
//       where: { id },
//       data: {
//         ...resumeValues,
//         skills:
//           resumeValues.skills?.filter((skill) => skill !== undefined) || [],
//         colorHex: resumeValues.colorHex ?? undefined,
//         photoUrl: newPhotoUrl ?? null,
//         borderStyle: resumeValues.borderStyle ?? undefined,
//         workExperiences: {
//           deleteMany: {},
//           create: workExperiences.map((exp) => ({
//             ...exp,
//             startDate: exp.startDate
//               ? new Date(exp.startDate).toISOString()
//               : null,
//             endDate: exp.endDate ? new Date(exp.endDate).toISOString() : null,
//             description: exp.description ?? undefined,
//             position: exp.position ?? undefined,
//             company: exp.company ?? undefined,
//           })),
//         },
//         education: {
//           deleteMany: {},
//           create: educations.map((edu) => ({
//             ...edu,
//             startDate: edu.startDate
//               ? new Date(edu.startDate).toISOString()
//               : null,
//             endDate: edu.endDate ? new Date(edu.endDate).toISOString() : null,
//             degree: edu.degree ?? "",
//             institution: edu.institution ?? "",
//           })),
//         },
//         updatedAt: new Date().toISOString(),
//       },
//     });
//   } else {
//     return prisma.resume.create({
//       // where: { id },
//       data: {
//         ...resumeValues,

//         userId,
//         photoUrl: newPhotoUrl,
//         workExperiences: {
//           create: workExperiences.map((exp) => ({
//             ...exp,
//             startDate: exp.startDate
//               ? new Date(exp.startDate).toISOString()
//               : null,
//             endDate: exp.endDate ? new Date(exp.endDate).toISOString() : null,
//           })),
//         },
//         education: {
//           create: educations.map((edu) => ({
//             ...edu,
//             startDate: edu.startDate
//               ? new Date(edu.startDate).toISOString()
//               : null,
//             endDate: edu.endDate ? new Date(edu.endDate).toISOString() : null,
//           })),
//         },
//         updatedAt: new Date().toISOString(),
//       },
//     });
//   }
// }

"use server";

import prisma from "@/lib/prisma";
import { resumeSchema, ResumeValues } from "@/lib/validation";
import { auth } from "@clerk/nextjs/server";
import { del, put } from "@vercel/blob";
import path from "path";

export async function saveResume(values: ResumeValues) {
  const { id } = values;
  console.log("received values", values);

  const {
    photo,
    workExperiences = [],
    educations = [],
    ...resumeValues
  } = resumeSchema.parse(values);

  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  // TODO: Check resume count for non-premium users

  const existingResume = id
    ? await prisma.resume.findUnique({ where: { id, userId } })
    : null;

  if (id && !existingResume) {
    throw new Error("Resume not found");
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

  if (id) {
    return prisma.resume.update({
      where: { id },
      data: {
        ...resumeValues,

        // colorHex: resumeValues.colorHex ?? undefined,
        photoUrl: newPhotoUrl,
        borderStyle: resumeValues.borderStyle ?? undefined,
        workExperiences: {
          deleteMany: {},
          create: workExperiences.map((exp) => ({
            ...exp,
            startDate: exp.startDate
              ? new Date(exp.startDate).toISOString()
              : null,
            endDate: exp.endDate ? new Date(exp.endDate).toISOString() : null,
            // description: exp.description ?? undefined,
            // position: exp.position ?? undefined,
            // company: exp.company ?? undefined,
          })),
        },
        education: {
          deleteMany: {},
          create: educations.map((edu) => ({
            ...edu,
            startDate: edu.startDate
              ? new Date(edu.startDate).toISOString()
              : null,
            endDate: edu.endDate ? new Date(edu.endDate).toISOString() : null,
            // degree: edu.degree ?? "",
            // institution: edu.institution ?? "",
          })),
        },
        updatedAt: new Date().toISOString(),
      },
    });
  } else {
    return prisma.resume.create({
      data: {
        ...resumeValues,
        userId,
        photoUrl: newPhotoUrl,
        workExperiences: {
          create: workExperiences.map((exp) => ({
            ...exp,
            startDate: exp.startDate
              ? new Date(exp.startDate).toISOString()
              : undefined,
            endDate: exp.endDate
              ? new Date(exp.endDate).toISOString()
              : undefined,
          })),
        },
        education: {
          create: educations.map((edu) => ({
            ...edu,
            startDate: edu.startDate
              ? new Date(edu.startDate).toISOString()
              : undefined,
            endDate: edu.endDate
              ? new Date(edu.endDate).toISOString()
              : undefined,
          })),
        },
        updatedAt: new Date().toISOString(),
      },
    });
  }
}
