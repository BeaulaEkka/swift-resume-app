"use server";

import {
  GenerateSummaryInput,
  generateSummarySchema,
  GenerateWorkExperienceInput,
  generateWorkExperiencesSchema,
  WorkExperience,
} from "@/lib/validation";
import { model } from "@/lib/geminiai";

export async function generateSummary(input: GenerateSummaryInput) {
  // TODO: Block for non-premium users

  const { jobTitle, workExperiences, educations, skills } =
    generateSummarySchema.parse(input);

  const systemMessage = `
    You are a job resume generator AI. Your task is to write a professional introduction summary for a resume provided by the user provided data. 
    Only return the summary and do not include any other information in the response. Keep it concise and professional.
  `;

  const userMessage = `
    Please generate a professional resume summary from this data: 
    Job Title: ${jobTitle || "N/A"}

    Work Experiences:
    ${workExperiences
      ?.map(
        (exp) => `
        Position: ${exp.position || "N/A"} at ${exp.company || "N/A"}, from ${
          exp.startDate || "N/A"
        }
        to ${exp.endDate || "Present"}.

        Description: ${exp.description || "N/A"}
      `
      )
      .join("\n\n")}

    Education:
    ${educations
      ?.map(
        (edu) => `
        Degree: ${edu.degree || "N/A"} from ${edu.institution || "N/A"}, from ${
          edu.startDate || "N/A"
        }
        to ${edu.endDate || "N/A"}.
        `
      )
      .join("\n\n")}

    Skills: ${skills?.join(", ") || "N/A"}
  `;
  console.log("system message", systemMessage);
  console.log("User message", userMessage);

  const prompt = `${systemMessage}\n\n${userMessage}`;

  const completion = await model.generateContent(prompt);

  const aiResponse = completion.response.text();

  if (!aiResponse) {
    throw new Error("Failed to genereate AI response");
  }
  return aiResponse;
}

export async function generateWorkExperience(
  input: GenerateWorkExperienceInput
) {
  //Block for non premium users
  const { description } = generateWorkExperiencesSchema.parse(input);

  const systemMessage = `
  You are a job resume generator AI. your task is to generate a single work experience entry based on the user input.Data can be omitted if they cant be infered from the provided information.

  Job Title: <job title>
  Company:<company name>
  start date: <format:YYYY-MM-DD> (only if provided)
  end date: <format:YYYY-MM-DD> (only if provided)
  Description: <an optimized description in bullet format, might be infered from the job title>
`;
  const userMessage = `
  Plese provide a work experience entry from this description- ${description}`;

  const prompt = `${systemMessage}\n\n${userMessage}`;

  const completion = await model.generateContent(prompt);

  const aiResponse = completion.response.text();

  if (!aiResponse) {
    throw new Error("Failed to genereate AI response");
  }
  console.log("aiResponse", aiResponse);
  return {
    position: aiResponse.match(/Job Title:\s*(.*)/)?.[1] || "",
    company: aiResponse.match(/Company:\s*(.*)/)?.[1] || "",
    startDate:
      aiResponse.match(/Start Date:\s*([\d]{4}-[\d]{2}-[\d]{2})/)?.[1] || "",
    endDate:
      aiResponse.match(/End Date:\s*([\d]{4}-[\d]{2}-[\d]{2})/)?.[1] || "",
    description:
      aiResponse.match(/Description:\s*([\s\S]*)/)?.[1]?.trim() || "",
  } as WorkExperience;
}
