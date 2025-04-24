import Image from "next/image";
import logo from "@/assets/resume-builder-logo.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import resumePreviewImage from "@/assets/resume-builder-logo.png";
import Section1 from "./(main)/Section1";
export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center gap-6 bg-gray-100 px-5 py-12 text-center text-gray-900 w-[80%] mx-auto">
      <div>
        <div className="max-w-prose space-y-3">
          <Image
            src={logo}
            width={150}
            height={150}
            alt="logo"
            className="mx-auto md:ms-0"
          />
          <h1 className="scrolm20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            <span>Create a </span>
            <span className="inline-block bg-gradient-to-r from-blue-300 to-blue-800 bg-clip-text text-7xl font-extrabold text-transparent">
              perfect Resume
            </span>{" "}
            in minutes
          </h1>
          <p className="">
            our <span className="font-bold"> AI resume builder</span> helps you
            design a professional resume even if you are not very smart
          </p>
          <Button asChild size="lg" variant="premium">
            <Link href="/resumes">Get started</Link>
          </Button>
        </div>
        <div className="relative">
          {/* Bottom Resume (Tilted More) */}

          {/* Top Resume (Main One) */}
          <Image
            src={resumePreviewImage}
            width={550}
            height={550}
            alt="resume preview"
            className="relative rounded-sm bg-white shadow lg:rotate-[2.5deg]"
          />
          <div className="absolute right-5 top-0 rotate-[-30.5deg]">
            <Image
              src={resumePreviewImage}
              width={550}
              height={550}
              alt="resume preview"
              className="rounded-sm bg-white shadow"
            />
          </div>
        </div>
      </div>

      <Section1 />
    </main>
  );
}
