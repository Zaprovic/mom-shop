"use client";

import Link from "next/link";
import { useTheme } from "next-themes";

// Define rosette color palette arrays for light/dark themes
const rosettePalettes = {
  light: [
    { bg: "bg-rose-100", text: "text-rose-800", accent: "bg-rose-200" },
    { bg: "bg-pink-100", text: "text-pink-800", accent: "bg-pink-200" },
    {
      bg: "bg-fuchsia-100",
      text: "text-fuchsia-800",
      accent: "bg-fuchsia-200",
    },
    { bg: "bg-purple-100", text: "text-purple-800", accent: "bg-purple-200" },
    { bg: "bg-violet-100", text: "text-violet-800", accent: "bg-violet-200" },
    { bg: "bg-indigo-100", text: "text-indigo-800", accent: "bg-indigo-200" },
    { bg: "bg-blue-100", text: "text-blue-800", accent: "bg-blue-200" },
  ],
  dark: [
    { bg: "bg-rose-950", text: "text-rose-200", accent: "bg-rose-800" },
    { bg: "bg-pink-950", text: "text-pink-200", accent: "bg-pink-800" },
    {
      bg: "bg-fuchsia-950",
      text: "text-fuchsia-200",
      accent: "bg-fuchsia-800",
    },
    { bg: "bg-purple-950", text: "text-purple-200", accent: "bg-purple-800" },
    { bg: "bg-violet-950", text: "text-violet-200", accent: "bg-violet-800" },
    { bg: "bg-indigo-950", text: "text-indigo-200", accent: "bg-indigo-800" },
    { bg: "bg-blue-950", text: "text-blue-200", accent: "bg-blue-800" },
  ],
};

interface CategoryCardProps {
  category: {
    id: number;
    name: string;
  };
  colorIndex: number;
}

export const CategoryCard = ({ category, colorIndex }: CategoryCardProps) => {
  const { resolvedTheme } = useTheme();

  const theme = resolvedTheme === "dark" ? "dark" : "light";
  const palette = rosettePalettes[theme];
  const colorSet = palette[colorIndex % palette.length];

  return (
    <Link href={`/categories/${category.id}`} className="group">
      <div
        className={`relative h-64 overflow-hidden rounded-xl shadow-md transition-all duration-300 ease-in-out group-hover:scale-[1.02] hover:shadow-lg ${colorSet.bg} bg-opacity-50`}
      >
        <div
          className={`absolute top-6 left-1/2 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full text-2xl font-bold transition-transform duration-300 group-hover:scale-110 ${colorSet.accent} border`}
        >
          <span className={colorSet.text}>
            {category.name.charAt(0).toUpperCase()}
          </span>
        </div>
        <div className="absolute bottom-12 left-0 w-full text-center">
          <h3
            className={`px-4 pb-3 text-sm font-semibold transition-all duration-300 group-hover:translate-y-[-5px] md:text-base ${colorSet.text}`}
          >
            {category.name}
          </h3>
        </div>
        <div
          className={`absolute right-0 bottom-0 left-0 overflow-hidden rounded-b-xl py-3 text-center transition-all duration-300 ${colorSet.accent} bg-opacity-50 group-hover:bg-opacity-70`}
        >
          <span className={`text-sm font-medium ${colorSet.text}`}>
            Ver productos
          </span>
        </div>
        <div
          className={`absolute -top-6 -right-6 h-16 w-16 rounded-full opacity-30 ${colorSet.accent}`}
        ></div>
        <div
          className={`absolute bottom-20 -left-4 h-8 w-8 rounded-full opacity-20 ${colorSet.accent}`}
        ></div>
      </div>
    </Link>
  );
};
