import { ResumeValues } from "./validation";

export interface EditorFormProps {
  resumeData: ResumeValues;
  setResumeData: (data: ResumeValues) => void;
  key: string;
}

export const resumeDataInclude = {
  workExperiences: true,
  education: true,
};
