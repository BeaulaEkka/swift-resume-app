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

export default function CreativeLayout({
  resumeData,
  contentRef,
  className,
}: ResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useDimensions(containerRef as RefObject<HTMLElement>);

  return (
    <div
      className={cn(
        "relative aspect-[210/297] h-fit w-full bg-blue-950 p-8 text-black",
        className,
      )}
      ref={containerRef}
    >
      <div
        className="absolute left-0 top-0 z-0 h-56 w-56 rounded-full bg-green-500"
        style={{
          backgroundColor: "#2dd4bf",
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='33' height='43' viewBox='0 0 36 72'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23172554' fill-opacity='100'%3E%3Cpath d='M2 6h12L8 18 2 6zm18 36h12l-6 12-6-12z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>{" "}
      <div
        className="absolute bottom-8 right-1 z-0 h-80 w-80 rounded-full bg-yellow-500"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23172554' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>{" "}
      <div
        className="absolute bottom-20 left-1 z-0 h-[500px] w-[500px] overflow-hidden rounded-full bg-rose-500"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='32' viewBox='0 0 20 12'%3E%3Cg fill-rule='evenodd'%3E%3Cg id='charlie-brown' fill='%23172554' fill-opacity='1'%3E%3Cpath d='M9.8 12L0 2.2V.8l10 10 10-10v1.4L10.2 12h-.4zm-4 0L0 6.2V4.8L7.2 12H5.8zm8.4 0L20 6.2V4.8L12.8 12h1.4zM9.8 0l.2.2.2-.2h-.4zm-4 0L10 4.2 14.2 0h-1.4L10 2.8 7.2 0H5.8z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>{" "}
      <div
        className={cn(
          "relative z-10 min-h-[1204px] bg-white p-4",
          !width && "invisible",
        )}
        style={{
          zoom: (1 / 794) * width,
        }}
        ref={contentRef}
        id="resumePreviewContent"
      >
        <div className="z-11 absolute right-[98%] top-[22%] h-0 w-0 rotate-45 border-b-[15px] border-l-[30px] border-t-[15px] border-b-transparent border-l-red-500 border-t-transparent"></div>
        <div className="z-11 absolute bottom-[40%] left-[97%] h-0 w-0 rotate-45 border-b-[20px] border-l-[45px] border-t-[20px] border-b-transparent border-l-cyan-500 border-t-transparent"></div>
        <div className="z-11 absolute right-[-14] top-5 h-5 w-5 rounded-full bg-yellow-500"></div>{" "}
        <div className="z-11 absolute right-[-8] top-12 h-3 w-3 rounded-full bg-yellow-500"></div>{" "}
        <PersonalInfoHeader resumeData={resumeData || defaultResumeData} />
        <SummarySection resumeData={resumeData || defaultResumeData} />
        <WorkExperienceSection resumeData={resumeData || defaultResumeData} />
        <EducationSection resumeData={resumeData || defaultResumeData} />
        <SkillsSection resumeData={resumeData || defaultResumeData} />
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
    <div className="border-5 flex items-center gap-6">
      {photoSrc && (
        <Image
          src={photoSrc}
          width={100}
          height={100}
          alt="Author Photo"
          className="aspect-square object-cover"
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
      <div className="space-y-2.5">
        <div className="space-y-1">
          <div className="flex flex-col items-center justify-center gap-2 border-4 border-purple-950 p-3">
            <p
              className="text-4xl font-bold capitalize"
              style={{ color: colorHex ?? "#000" }}
            >
              {firstName} <span>{lastName}</span>
            </p>
            <p className="text-lg font-medium">{jobTitle}</p>
          </div>

          <div className="space-y-1 text-sm text-gray-500">
            {city}
            {city && country ? ", " : ""}

            {country}
            {(city || country) && (phone || email) ? " " : ""}
            <br />
            <p> {[phone, email].filter(Boolean).join(" \| ")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SummarySection({ resumeData }: ResumeSectionProps) {
  const { summary, colorHex } = resumeData;

  if (!summary) return null;

  return (
    <div className="space-y-3 pt-4">
      <div className="break-inside-avoid space-y-3">
        <div className="flex items-center justify-center">
          <div className="w-[35%] border-4 border-purple-950 p-3 text-center">
            <p
              className="text-lg font-semibold"
              style={{
                color: colorHex ?? "#000",
              }}
            >
              Professional profile
            </p>
          </div>
        </div>

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
        <div className="flex items-center justify-center">
          <div className="w-[35%] border-4 border-purple-950 p-3 text-center">
            {" "}
            <p
              className="text-lg font-semibold"
              style={{ color: colorHex ?? "#000" }}
            >
              Work Experience
            </p>
          </div>
        </div>

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
      <div className="space-y-3">
        <div className="flex items-center justify-center">
          <div className="w-[35%] border-4 border-purple-950 p-3 text-center">
            <p
              className="text-lg font-semibold"
              style={{ color: colorHex ?? "#000" }}
            >
              Education
            </p>
          </div>
        </div>

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
      <div className="space-y-3">
        <div className="flex items-center justify-center">
          <div className="w-[35%] border-4 border-purple-950 p-3 text-center">
            <p
              className="text-lg font-semibold"
              style={{ color: colorHex ?? "#000" }}
            >
              Skills
            </p>
          </div>
        </div>

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
