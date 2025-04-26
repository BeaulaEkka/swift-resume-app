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

export default function MinimalLayout({
  resumeData,
  contentRef,
  className,
}: ResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useDimensions(containerRef as RefObject<HTMLElement>);

  return (
    <div
      className={cn(
        "aspect-[210/297] min-h-[310px] bg-white text-black",
        className,
      )}
      ref={containerRef}
    >
      <div
        className={cn("flex h-full", !width && "invisible")}
        style={{
          zoom: (1 / 794) * width,
        }}
        ref={contentRef}
        id="resumePreviewContent"
      >
        <div className="w-[35%] bg-gray-900">
          <div className="">
            <PersonalInfoHeader resumeData={resumeData || defaultResumeData} />
          </div>
          <EducationSection resumeData={resumeData || defaultResumeData} />
        </div>
        <div className="w-[65%] bg-white">
          <SummarySection resumeData={resumeData || defaultResumeData} />
          <WorkExperienceSection resumeData={resumeData || defaultResumeData} />

          <SkillsSection resumeData={resumeData || defaultResumeData} />
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
    <div className="flex flex-col">
      {photoSrc && (
        <Image
          src={photoSrc}
          width={100}
          height={100}
          alt="Author Photo"
          className="h-96 w-full snap-center object-cover"
          style={{
            borderRadius:
              borderStyle === BorderStyles.SQUARE
                ? "0px"
                : borderStyle === BorderStyles.CIRCLE
                  ? "9999px"
                  : "10%",
          }}
        />
      )}
      <div className="p-5 text-white">
        <div className="space-y-1">
          <div className="space-y-1 text-sm">
            <p
              className="py-2 text-lg font-semibold uppercase tracking-wider text-white"
              style={{
                color:
                  colorHex?.toLowerCase() === "#000000"
                    ? "#fff"
                    : (colorHex ?? "#000"),
              }}
            >
              contact
            </p>
            {city}
            {city && country ? ", " : ""}

            {country}
            {(city || country) && (phone || email) ? " " : ""}
            <br />
            <p>
              {" "}
              <span className="font-semibold">Phone:</span>{" "}
              {[phone].filter(Boolean).join("  ")}
            </p>
            <p>{email}</p>
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
    <div className="min-h-[200px] space-y-3 pt-4">
      {" "}
      <div className="break-inside-avoid space-y-3">
        <div className="mt-5 bg-yellow-400 px-5 py-10">
          <p
            className="text-3xl font-bold uppercase leading-relaxed tracking-wider"
            style={{
              color:
                colorHex?.toLowerCase() === "#fcb900"
                  ? "#000"
                  : (colorHex ?? "#000"),
            }}
          >
            {firstName} <span className="font-light">{lastName}</span>
          </p>
          <p className="font-light uppercase tracking-wider">{jobTitle}</p>
        </div>
        <div>
          <p
            className="pl-5 text-lg font-semibold uppercase tracking-wider"
            style={{
              color: colorHex ?? "#000",
            }}
          >
            Professional profile
          </p>
          {summary && (
            <div className="whitespace-pre-line pl-5 pt-2 text-sm">
              {summary}
            </div>
          )}
        </div>
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
      <div className="space-y-3">
        <p
          className="pl-5 text-lg font-semibold uppercase tracking-wider"
          style={{ color: colorHex ?? "#000" }}
        >
          Work Experience
        </p>
        {workExperienceNotEmpty.map((exp, index) => (
          <div key={index} className="break-inside-avoid space-y-1 pl-5">
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
    <div className="space-y-3 px-5 pt-4">
      <div className="space-y-3">
        <p
          className="text-lg font-semibold uppercase tracking-wider text-white"
          style={{
            color:
              colorHex?.toLowerCase() === "#000000"
                ? "#fff"
                : (colorHex ?? "#000"),
          }}
        >
          Education
        </p>
        {educationNotEmpty.map((edu, index) => (
          <div className="break-inside-avoid space-y-1" key={index}>
            <div className="flex flex-col space-y-1 pt-2 text-sm font-semibold text-white">
              <div className="font-bold uppercase">{edu.degree}</div>
              <div className="text-md capitalize text-gray-400">
                {edu.institution}
              </div>
              {edu.startDate && (
                <div className="font-light text-gray-400">
                  {formatDate(edu.startDate, "MMM yyyy ")}-{" "}
                  {edu.endDate
                    ? formatDate(edu.endDate, "MMM yyyy")
                    : "present"}
                </div>
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
      <div className="space-y-3">
        <p
          className="pl-5 text-lg font-semibold uppercase tracking-wider"
          style={{ color: colorHex ?? "#000" }}
        >
          Skills
        </p>
        <div className="pl-5">
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
