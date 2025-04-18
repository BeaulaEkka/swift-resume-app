import { ResumeValues } from "@/lib/validation";

export default function Layout1({ data }: { data: ResumeValues }) {
  return (
    <div className="border bg-white p-6 text-black">
      <h1 className="text-2xl font-bold">{data.name}</h1>
      <p>{data.email}</p>
      {/* Add more resume sections */}
    </div>
  );
}
