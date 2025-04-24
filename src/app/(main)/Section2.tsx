import React from "react";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Jeroen de Vries",
    text: "This resume builder made the whole process incredibly smooth. I landed interviews within days!",
    rating: 5,
  },
  {
    name: "Sanne van Dijk",
    text: "I love how intuitive the platform is. The templates are clean, modern, and easy to edit.",
    rating: 4,
  },
  {
    name: "Thijs Bakker",
    text: "The AI suggestions helped me write my experience section like a pro. Super useful!",
    rating: 5,
  },
  {
    name: "Lotte Jansen",
    text: "I finally feel confident sending out my resume. It looks amazing thanks to this tool.",
    rating: 3,
  },
  {
    name: "Rick Vermeer",
    text: "One of the best tools I’ve used. Simple, effective, and really polished results.",
    rating: 4,
  },
];

export default function Section2() {
  return (
    <section className="mx-auto my-16 w-[87%] px-4 text-left">
      <header className="mb-10 text-center">
        <h1 className="text-3xl font-bold">
          Backed by Users. Chosen by Professionals.
        </h1>
        <p className="mt-2 text-gray-700">
          Join a growing community of job seekers who trust our builder to craft
          resumes that get results.
        </p>
      </header>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="rounded-2xl border bg-white p-5 shadow-md transition hover:shadow-lg"
          >
            {/* Dynamic Star Rating */}
            <div className="mb-3 flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  fill={i < review.rating ? "#22c55e" : "none"} // Fill for rated stars
                  stroke="#000000" // Black border for all stars
                />
              ))}
            </div>
            <p className="italic text-gray-800">&quot;{review.text}&quot;</p>
            <p className="mt-4 font-semibold text-gray-900">— {review.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
