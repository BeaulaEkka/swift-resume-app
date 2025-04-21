import useDimensions from "@/hooks/useDimensions";
import { cn } from "@/lib/utils";
import { ResumeValues } from "@/lib/validation";

import Image from "next/image";
import { formatDate } from "date-fns";
import React, { RefObject, useEffect, useRef, useState } from "react";

import { BorderStyles } from "@/app/(main)/editor/BorderStyleButton";
import { Badge } from "@/components/ui/badge";

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

export default function ModernLayout({
  resumeData,
  contentRef,
  className,
}: ResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useDimensions(containerRef as RefObject<HTMLElement>);

  return (
    <div
      className="flex h-[1122px] w-[794px] bg-white text-black shadow-md"
      ref={containerRef}
    >
      <div
        className={cn("", !width && "invisible")}
        style={{
          zoom: (1 / 794) * width,
        }}
        ref={contentRef}
        id="resumePreviewContent"
      >
        <div className="flex w-[100%]">
          <PersonalInfoHeader resumeData={resumeData || defaultResumeData} />
          <div className="w-[70%] border border-green-500 p-5">
            {" "}
            <SummarySection resumeData={resumeData || defaultResumeData} />
            <WorkExperienceSection
              resumeData={resumeData || defaultResumeData}
            />
            <EducationSection resumeData={resumeData || defaultResumeData} />
            <SkillsSection resumeData={resumeData || defaultResumeData} />
          </div>
        </div>
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
    <div className="flex flex-col items-center gap-6 py-10 pl-10 pr-1">
      <div className="h-full bg-gray-300">
        {photoSrc && (
          <div>
            <Image
              src={photoSrc}
              width={100}
              height={100}
              alt="Authot Photo"
              className="aspect-square h-full w-[100%] object-cover"
              style={{
                borderRadius:
                  borderStyle === BorderStyles.SQUARE
                    ? "0px"
                    : borderStyle === BorderStyles.CIRCLE
                      ? "9999px"
                      : "10%",
              }}
            />
          </div>
        )}
        <div className="space-y-2.5 p-5">
          <div className="space-y-1">
            <div className="space-y-2 text-sm text-gray-700">
              {city}
              {city && country ? ", " : ""}

              <span className="font-semibold">{country}</span>
              {(city || country) && (phone || email) ? " " : ""}

              <p className="mt-2">
                {" "}
                {[phone, email].filter(Boolean).join(" ")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SummarySection({ resumeData }: ResumeSectionProps) {
  const { summary, colorHex, firstName, lastName, jobTitle } = resumeData;

  if (!summary) return null;

  return (
    <div className="space-y-3 pt-4">
      <p
        className="text-3xl font-bold capitalize"
        style={{ color: colorHex ?? "#000" }}
      >
        {firstName} <span>{lastName}</span>
      </p>
      <p className="font-medium">{jobTitle}</p>
      {/* <hr className="border-2" style={{ borderColor: colorHex ?? "#000" }} /> */}
      <div className="break-inside-avoid space-y-3">
        <p
          className="text-lg font-semibold"
          style={{
            color: colorHex ?? "#000",
          }}
        >
          Professional profile
        </p>
        <div className="whitespace-pre-line text-sm">{summary}</div>
      </div>
    </div>
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
    <div className="space-y-3 pt-4">
      {/* <hr
        className="mt-4 border-2"
        style={{ borderColor: colorHex ?? "#000" }}
      /> */}
      <div className="space-y-3">
        <p
          className="text-lg font-semibold"
          style={{ color: colorHex ?? "#000" }}
        >
          Work Experience
        </p>
        {workExperienceNotEmpty.map((exp, index) => (
          <div key={index} className="break-inside-avoid space-y-1">
            <div
              className="flex items-center justify-between text-sm font-semibold"
              // style={{ color: colorHex }}
            >
              <span className="text-lg font-bold">{exp.position}</span>
              {exp.startDate && (
                <span className="text-gray-500">
                  {formatDate(exp.startDate, "MM/yyyy")}-{" "}
                  {exp.endDate ? formatDate(exp.endDate, "MM/yyyy") : "present"}
                </span>
              )}
            </div>
            <p className="text-sm font-semibold text-gray-500">{exp.company}</p>
            <div className="flex whitespace-pre-line text-sm">
              {exp.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EducationSection({ resumeData }: ResumeSectionProps) {
  const { educations, colorHex } = resumeData;

  const educationNotEmpty = educations?.filter(
    (edu) => Object.values(edu).filter(Boolean).length > 0,
  );
  if (!educationNotEmpty?.length) return null;

  return (
    <div className="space-y-3 pt-4">
      <hr
        className="mt-4 border-2"
        style={{ borderColor: colorHex ?? "#000" }}
      />
      <div className="space-y-3">
        <p
          className="text-lg font-semibold"
          style={{ color: colorHex ?? "#000" }}
        >
          Education
        </p>
        {educationNotEmpty.map((edu, index) => (
          <div className="break-inside-avoid space-y-1" key={index}>
            <div className="flex items-center justify-between text-sm font-semibold">
              <span className="font-bold capitalize">{edu.degree}</span>
              <span className="capitalize">{edu.institution}</span>
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
    </div>
  );
}

function SkillsSection({ resumeData }: ResumeSectionProps) {
  const { skills, colorHex, borderStyle } = resumeData;
  if (!skills?.length) return null;
  return (
    <div className="space-y-3 pt-4">
      <hr className="border-2" style={{ borderColor: colorHex ?? "#000" }} />
      <div className="space-y-3">
        <p
          className="text-lg font-semibold"
          style={{ color: colorHex ?? "#000" }}
        >
          Skills
        </p>
        <div>
          {skills.map((skill, index) => (
            <Badge
              key={index}
              className="my-2 mr-2 rounded-md bg-black px-3 py-2 capitalize text-white"
              style={{
                backgroundColor: colorHex ?? "#000",
                borderRadius:
                  borderStyle === BorderStyles.SQUARE
                    ? "0px"
                    : borderStyle === BorderStyles.CIRCLE
                      ? "9999px"
                      : "8px",
              }}
            >
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
