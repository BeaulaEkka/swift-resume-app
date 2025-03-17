"use server";

import { GenerateSummaryInput, generateSummarySchema } from "@/lib/validation";
import { genAI, model } from "@/lib/geminiai";

export async function generateSummary(input: GenerateSummaryInput) {
  // TODO: Block for non-premium users

  const { jobTitle, workExperiences, educations, skills } =
    generateSummarySchema.parse(input);

  const systemMessage = `
    You are a job resume generator AI. Your task is to write a professional introduction summary for a resume given the user's provided data. 
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
