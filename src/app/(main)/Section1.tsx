import Image from "next/image";
import React from "react";
import saveTimeImg from "@/assets/landingPageImages/save-time.png";
import pencil from "@/assets/landingPageImages/pencil.png";
import ai from "@/assets/landingPageImages/ai.png";
import superhero from "@/assets/landingPageImages/superhero.png";
import selfConfident from "@/assets/landingPageImages/self-confident.png";
import roleModel from "@/assets/landingPageImages/role-model.png";

export default function Section1() {
  return (
    <div className="text-left">
      <h1 className="pb-16 text-3xl font-bold text-center">
        Land Your Dream Job with a Standout Resume
      </h1>
      <section className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 w-[87%] mx-auto">
        <section className="flex items-start gap-5">
          <Image src={saveTimeImg} alt="Save Time" width={80} height={80} />
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-bold capitalize">
              Create a professional resume in just minutes
            </h2>
            <p>
              Say goodbye to outdated resumes. Our easy-to-use builder helps you
              craft a polished, modern resume that catches recruiters&apos;
              attention.
            </p>
          </div>
        </section>

        <section className="flex items-start gap-5">
          <Image src={pencil} alt="Pencil Icon" width={80} height={80} />
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-bold capitalize">
              Expert-Backed Resume Content
            </h2>
            <p>
              No more writer&apos;s block. Choose from a library of
              professionally written content, crafted by industry experts to
              help you impress instantly.
            </p>
          </div>
        </section>

        <section className="flex items-start gap-5">
          <Image src={ai} alt="AI Icon" width={80} height={80} />
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-bold capitalize">
              Smart AI Assistance
            </h2>
            <p>
              Let AI do the heavy lifting—generate tailored summaries and
              powerful bullet points in seconds. Write less, achieve more.
            </p>
          </div>
        </section>

        <section className="flex items-start gap-5">
          <Image src={roleModel} alt="Role Model Icon" width={80} height={80} />
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-bold capitalize">
              Stand Out from the Crowd
            </h2>
            <p>
              Our high-performing resume designs are built to highlight your
              strengths and make you the obvious choice.
            </p>
          </div>
        </section>

        <section className="flex items-start gap-5">
          <Image
            src={selfConfident}
            alt="Confidence Icon"
            width={80}
            height={80}
          />
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-bold capitalize">
              Negotiate with Confidence
            </h2>
            <p>
              Use our salary insights tool to compare job offers and know
              exactly what you&apos;re worth.
            </p>
          </div>
        </section>

        <section className="flex items-start gap-5">
          <Image src={superhero} alt="Superhero Icon" width={80} height={80} />
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-bold capitalize">
              Designs That Match Your Style
            </h2>
            <p>
              Whether you&apos;re applying for a creative role or a corporate
              position, our diverse layout options help your resume stand out
              for all the right reasons.
            </p>
          </div>
        </section>
      </section>
    </div>
  );
}
