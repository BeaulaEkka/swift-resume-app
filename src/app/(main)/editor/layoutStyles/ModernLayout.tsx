"use client";
import useDimensions from "@/hooks/useDimensions";
import { cn } from "@/lib/utils";
import { ResumeValues } from "@/lib/validation";
import Image from "next/image";
import { formatDate } from "date-fns";
import React, { RefObject, useEffect, useRef, useState } from "react";
import { BorderStyles } from "@/app/(main)/editor/BorderStyleButton";

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
      className={cn(
        "aspect-[210/297] h-fit w-[794px] bg-white p-12 text-black",
        className,
      )}
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
        <div className="flex min-h-[1027px]">
          <div className="mr-5 flex flex-grow flex-col bg-gray-200">
            {" "}
            <PersonalInfoHeader resumeData={resumeData || defaultResumeData} />
            <EducationSection resumeData={resumeData || defaultResumeData} />
            <SkillsSection resumeData={resumeData || defaultResumeData} />
          </div>

          <div className="mt-5 w-[70%] pr-5">
            {" "}
            <SummarySection resumeData={resumeData || defaultResumeData} />
            <WorkExperienceSection
              resumeData={resumeData || defaultResumeData}
            />
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
    // firstName,
    // lastName,
    // jobTitle,
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
    <div className="flex flex-col items-center gap-6">
      <div className="w-full">
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
          {phone && (
            <>
              <h1
                className="text-xl font-bold capitalize"
                style={{
                  color: colorHex ?? "#000",
                }}
              >
                Contact
              </h1>

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
            </>
          )}
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

      <div className="break-inside-avoid space-y-3">
        <p
          className="text-xl font-bold capitalize"
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
      <div className="space-y-3">
        <p
          className="text-xl font-bold capitalize"
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
              <span className="text-lg font-semibold">{exp.position}</span>
              {exp.startDate && (
                <span className="text-gray-500">
                  {formatDate(exp.startDate, "MM/yyyy")}-{" "}
                  {exp.endDate ? formatDate(exp.endDate, "MM/yyyy") : "present"}
                </span>
              )}
            </div>
            <p className="text-sm font-semibold text-gray-500">{exp.company}</p>

            {exp.description && (
              <ul className="list-disc pl-4 text-sm">
                {exp.description.split("\n").map((line, idx) => (
                  <li key={idx}>{line.replace(/^- /, "")}</li>
                ))}
              </ul>
            )}
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
    <div className="space-y-3 pl-5 pt-4">
      <div className="space-y-3">
        <p
          className="text-xl font-bold capitalize"
          style={{ color: colorHex ?? "#000" }}
        >
          Education
        </p>
        {educationNotEmpty.map((edu, index) => (
          <div className="space-y-1" key={index}>
            <div className="mt-2 flex flex-col text-sm font-semibold capitalize">
              <span className="text-md font-bold">{edu.degree}</span>
              <span className="text-md text-gray-500">{edu.institution}</span>
              {edu.startDate && (
                <span className="text-sm font-light text-gray-500">
                  {formatDate(edu.startDate, "MMM  yy ")}-{" "}
                  {edu.endDate ? formatDate(edu.endDate, "MMM yy") : "present"}
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
  const { skills, colorHex } = resumeData;
  if (!skills?.length) return null;
  return (
    <div className="space-y-3 pl-5 pt-4">
      <div className="mt-4 space-y-3">
        <p
          className="text-xl font-bold capitalize"
          style={{ color: colorHex ?? "#000" }}
        >
          Skills
        </p>
        <div>
          <ul className="list-disc space-y-1 pl-5 font-semibold capitalize">
            {skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
