import Image from "next/image";
import logo from "@/assets/resume-builder-logo.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gray-100 px-5 py-12 text-center text-gray-900 md:flex-row md:text-start lg:gap-12">
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
        <Button asChild size="lg" variant="secondary"><Link href="/resumes">Get started</Link></Button>
      </div>
    </main>
  );
}
