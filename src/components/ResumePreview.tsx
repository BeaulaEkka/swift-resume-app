import useDimensions from "@/hooks/useDimensions";
import { cn } from "@/lib/utils";
import { ResumeValues } from "@/lib/validation";

import Image from "next/image";
import { formatDate } from "date-fns";
import React, { useEffect, useRef, useState } from "react";
import { Badge } from "./ui/badge";

interface ResumePreviewProps {
  resumeData: ResumeValues;
  contentRef?: React.Ref<HTMLDivElement>;
  className?: string;
}
const defaultResumeData: ResumeValues = {
  firstName: "",
  lastName: "",
  jobTitle: "",
  city: "",
  country: "",
  phone: "",
  email: "",
  colorHex: "#000000",
  borderStyle: "solid",
  photo: null,
  summary: "",
  workExperiences: [],
  educations: [],
  skills: [],
};

export default function ResumePreview({
  resumeData,
  contentRef,
  className,
}: ResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useDimensions(containerRef);

  return (
    <div
      className={cn(
        "aspect-[210/297] h-fit w-full border border-green-500 bg-white p-12 text-black",
        className,
      )}
      ref={containerRef}
    >
      <div
        className={cn("border border-pink-500", !width && "invisible")}
        style={{
          zoom: (1 / 794) * width,
        }}
        ref={contentRef}
        id="resumePreviewContent"
      >
        <PersonalInfoHeader resumeData={resumeData} />
        <SummarySection resumeData={resumeData} />
        <WorkExperienceSection resumeData={resumeData} />
        <EducationSection resumeData={resumeData} />
        <SkillsSection resumeData={resumeData} />
      </div>
    </div>
  );
}

interface ResumeSectionProps {
  resumeData: ResumeValues;
}

function PersonalInfoHeader({ resumeData }: ResumeSectionProps) {
  const {
    photo,
    firstName,
    lastName,
    jobTitle,
    city,
    country,
    phone,
    email,
    colorHex,
    borderStyle,
  } = resumeData;

  const [photoSrc, setPhotoSrc] = useState(photo instanceof File ? "" : photo);

  useEffect(() => {
    const objectUrl = photo instanceof File ? URL.createObjectURL(photo) : "";
    if (objectUrl) setPhotoSrc(objectUrl);
    if (photo === null) setPhotoSrc("");
    return () => URL.revokeObjectURL(objectUrl);
  }, [photo]);

  return (
    <div className="flex items-center gap-6">
      {photoSrc && (
        <Image
          src={photoSrc}
          width={100}
          height={100}
          alt="Authot Photo"
          className="aspect-square object-cover"
        />
      )}
      <div className="space-y-2.5">
        <div className="space-y-1">
          <p className="text-3xl font-bold" style={{ color: colorHex }}>
            {firstName}
            {lastName}
          </p>
          <p className="font-medium">{jobTitle}</p>
          <p className="text-xs text-gray-500">
            {city}
            {city && country ? ", " : ""}

            {country}
            {(city || country) && (phone || email) ? " \| " : ""}
            <br />
            {[phone, email].filter(Boolean).join(" \| ")}
          </p>
        </div>
      </div>
    </div>
  );
}

function SummarySection({ resumeData }: ResumeSectionProps) {
  const { summary, colorHex } = resumeData;

  if (!summary) return null;

  return (
    <>
      <hr
        className="border-2"
        style={{
          borderColor: colorHex,
        }}
      />
      <div className="break-inside-avoid space-y-3">
        <p
          className="text-lg font-semibold"
          style={{
            color: colorHex,
          }}
        >
          Professional profile
        </p>
        <div className="whitespace-pre-line text-sm">{summary}</div>
      </div>
    </>
  );
}

function WorkExperienceSection({ resumeData }: ResumeSectionProps) {
  const { workExperiences, colorHex } = resumeData;
  if (!workExperiences) return null;
  const workExperienceNotEmpty = workExperiences?.filter(
    (exp) => Object.values(exp).filter(Boolean).length > 0,
  );

  if (!workExperienceNotEmpty?.length) return null;

  return (
    <>
      <hr className="border-2" style={{ borderColor: colorHex }} />
      <div className="space-y-3">
        <p className="text-lg font-semibold">Work Experience</p>
        {workExperienceNotEmpty.map((exp, index) => (
          <div key={index} className="break-inside-avoid space-y-1">
            <div
              className="flex items-center justify-between text-sm font-semibold"
              style={{ color: colorHex }}
            >
              <span>{exp.position}</span>
              {exp.startDate && (
                <span>
                  {formatDate(exp.startDate, "MM/yyyy")}-{" "}
                  {exp.endDate ? formatDate(exp.endDate, "MM/yyyy") : "present"}
                </span>
              )}
            </div>
            <p className="text-sm font-semibold">{exp.company}</p>
            <div className="flex whitespace-pre-line text-sm">
              {exp.description}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function EducationSection({ resumeData }: ResumeSectionProps) {
  const { educations, colorHex } = resumeData;

  const educationNotEmpty = educations?.filter(
    (edu) => Object.values(edu).filter(Boolean).length > 0,
  );
  if (!educationNotEmpty?.length) return null;
  console.log("educationNotEmpty", educationNotEmpty);

  return (
    <>
      <hr className="border-2" style={{ borderColor: colorHex }} />
      <div className="space-y-3">
        <p className="text-lg font-semibold" style={{ color: colorHex }}>
          Education
        </p>
        {educationNotEmpty.map((edu, index) => (
          <div className="break-inside-avoid space-y-1" key={index}>
            <div
              className="flex items-center justify-between text-sm font-semibold"
              style={{ color: colorHex }}
            >
              <span className="font-bold capitalize">{edu.degree}</span>
              <span>{edu.institution}</span>
              {edu.startDate && (
                <span>
                  {formatDate(edu.startDate, "MMM yyyy ")}-{" "}
                  {edu.endDate
                    ? formatDate(edu.endDate, "MMM yyyy")
                    : "present"}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function SkillsSection({ resumeData }: ResumeSectionProps) {
  const { skills, colorHex } = resumeData;
  if (!skills?.length) return null;
  return (
    <div>
      <hr className="border-2" style={{ borderColor: colorHex }} />
      <div className="space-y-3">
        <p className="text-lg font-semibold" style={{ color: colorHex }}>
          Skills
        </p>
        <div>
          {skills.map((skill, index) => (
            <Badge
              key={index}
              className="my-2 mr-2 rounded-md bg-black px-3 py-2 capitalize text-white"
              style={{ backgroundColor: colorHex }}
            >
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
