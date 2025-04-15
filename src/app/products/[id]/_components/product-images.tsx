"use client";

import { useState } from "react";
import Image from "next/image";
import { SelectProductWithCategoryType } from "@/types";

export default function ProductImages({
  product,
}: {
  product: SelectProductWithCategoryType;
}) {
  const [selectedImage, setSelectedImage] = useState(0);
  const hasImages = product.images && product.images.length > 0;

  return (
    <div className="flex flex-col space-y-3">
      {/* Main image container with reduced max-height */}
      <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm">
        <div className="aspect-[4/3] w-full">
          <Image
            src={product.images?.[selectedImage] ?? product.mainImage}
            alt={product.name}
            fill
            className="object-contain p-4"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>

      {/* Smaller thumbnails with scrollable container */}
      {hasImages && (product.images?.length ?? 0) > 1 ? (
        <div className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent flex snap-x space-x-2 overflow-auto pb-1">
          {product.images?.map((img: string, index: number) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative flex-shrink-0 snap-center overflow-hidden rounded-md transition-all ${
                selectedImage === index
                  ? "ring-primary ring-2 ring-offset-1"
                  : "ring-1 ring-gray-200 hover:ring-gray-300"
              }`}
              aria-label={`View image ${index + 1}`}
            >
              <div className="h-14 w-14 sm:h-16 sm:w-16">
                <Image
                  src={img}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
