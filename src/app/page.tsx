import Image from "next/image";
import logo from "@/assets/resume-builder-logo.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Section1 from "./(main)/Section1";
import Section2 from "./(main)/Section2";
export default function Home() {
  return (
    <main className="mx-auto flex w-[80%] flex-col items-center justify-center gap-6 bg-gray-100 px-5 py-12 text-center text-gray-900">
      <div>
        <div className="max-w-prose space-y-3">
          <Image
            src={logo}
            width={150}
            height={150}
            alt="logo"
            className="mx-auto md:ms-0"
          />
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
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
          <div className="absolute right-5 top-0 rotate-[-30.5deg]"></div>
        </div>
      </div>

      <Section1 />
      <Section2 />
    </main>
  );
}
