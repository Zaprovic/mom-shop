"use client";

import { SelectCategoryType } from "@/types";
import { motion } from "motion/react";

import Link from "next/link";
import { useState } from "react";

type props = {
  categories: SelectCategoryType[];
};

const CategoriesContainer = ({ categories }: props) => {
  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {categories.map((category, index) => (
        <motion.div
          key={category.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className={`overflow-hidden rounded-xl shadow-lg transition-shadow duration-300 hover:shadow-xl`}
        >
          <Link href={`/categories/${category.id}`} className="block">
            <div className="relative h-64 w-full">
              <img
                src={"images/beauty-01.webp"}
                alt={"name"}
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="mb-2 text-xl font-semibold text-gray-800">
                {category.name}
              </h3>
              <p className="mb-4 line-clamp-4 text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit
                voluptates dicta ut officiis, doloribus vel possimus architecto
                quo inventore provident fugit nulla adipisci eos reprehenderit
                maiores placeat ipsa ipsum ipsam rerum eum eius dolore aut?
                Tempore quidem fugit suscipit eaque officia non perspiciatis
                aspernatur eveniet, dignissimos voluptatibus cum quam saepe
                minus, quas temporibus alias nam rem? A corrupti consequatur
                reprehenderit nostrum! Veniam adipisci aliquam quia, cupiditate
                fuga quisquam numquam sed, expedita soluta molestias magni
                corrupti dolorem ipsum repudiandae. Numquam nulla eum mollitia
                porro assumenda impedit? Optio illum maiores nesciunt, dolores
                distinctio quisquam impedit, amet esse dignissimos maxime nobis
                odio vero.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">
                  Explore collection
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 text-gray-500"
                >
                  <path d="m9 18 6-6-6-6"></path>
                </svg>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

export default CategoriesContainer;
