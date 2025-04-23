import { ResumeValues } from "@/lib/validation";
import defaultPhoto from "../assets/defaultPhoto.jpeg";

export const mockupResumeData: ResumeValues = {
  firstName: "Jane",
  lastName: "Doe",
  jobTitle: "Full Stack Developer",
  city: "Amsterdam",
  country: "Netherlands",
  phone: "+31 6 12345678",
  email: "jane.doe@example.com",
  colorHex: "#1f2937", // Tailwind's gray-800
  borderStyle: "rounded",
  photo: defaultPhoto,
  summary: `Passionate developer with 5+ years of experience in building scalable web applications. Strong background in JavaScript, React, and Laravel.`,
  workExperiences: [
    {
      position: "Frontend Developer",
      company: "TechNova B.V.",
      startDate: "2021-06-01",
      endDate: "2023-08-01",
      description: `- Developed responsive UI components using React\n- Collaborated with backend team for API integration\n- Improved application performance by 20%`,
    },
    {
      position: "Web Developer Intern",
      company: "Creative Agency",
      startDate: "2020-01-01",
      endDate: "2020-06-01",
      description: `- Assisted in building client websites using WordPress\n- Created custom JavaScript components for interactive elements`,
    },
  ],
  educations: [
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "University of Amsterdam",
      startDate: "2016-09-01",
      endDate: "2020-06-01",
    },
  ],
  skills: ["JavaScript", "React", "Laravel", "Tailwind CSS", "Node.js"],
};
