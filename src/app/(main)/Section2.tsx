import React from "react";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Jeroen de Vries",
    text: "Fantastische tool! Mijn sollicitatie werd meteen serieus genomen na het updaten van mijn CV met deze builder.",
  },
  {
    name: "Sanne van Dijk",
    text: "Gebruiksvriendelijk en professioneel. De AI-suggesties waren spot-on!",
  },
  {
    name: "Thijs Bakker",
    text: "Ik was verrast hoe snel ik een mooi CV kon maken. Zeker een aanrader!",
  },
  {
    name: "Lotte Jansen",
    text: "De designs zijn prachtig. Mijn CV springt er nu echt uit!",
  },
  {
    name: "Rick Vermeer",
    text: "Ik kreeg binnen een week al twee uitnodigingen. Topkwaliteit!",
  },
];

export default function Section2() {
  return (
    <section className="my-16">
      <header className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-green-700">
          Backed by Users. Chosen by Professionals.
        </h1>
        <p className="mt-2 text-gray-700">
          Join a growing community of job seekers who trust our builder to craft
          resumes that get results.
        </p>
      </header>
      <div className="grid grid-cols-1 gap-6 px-4 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="rounded-2xl border p-5 shadow-md transition hover:shadow-lg"
          >
            <div className="mb-2 flex items-center gap-2 text-green-600">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  fill="currentColor"
                  stroke="currentColor"
                />
              ))}
            </div>
            <p className="italic text-gray-800">"{review.text}"</p>
            <p className="mt-4 font-semibold text-gray-900">— {review.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
