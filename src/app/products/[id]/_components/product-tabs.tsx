"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SelectProductWithCategoryType } from "@/types";

export default function ProductTabs({
  product,
}: {
  product: SelectProductWithCategoryType;
}) {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <div className="border-t pt-6">
      <div className="flex gap-x-3 overflow-x-auto pb-2">
        <Button
          variant={activeTab === "description" ? "default" : "outline"}
          onClick={() => setActiveTab("description")}
          size="sm"
        >
          Descripción
        </Button>
        <Button
          variant={activeTab === "howToUse" ? "default" : "outline"}
          onClick={() => setActiveTab("howToUse")}
          size="sm"
        >
          Cómo usar
        </Button>
        <Button
          variant={activeTab === "ingredients" ? "default" : "outline"}
          onClick={() => setActiveTab("ingredients")}
          size="sm"
        >
          Ingredientes
        </Button>
      </div>

      <div className="py-4">
        {activeTab === "description" && (
          <div className="prose max-w-none">
            <p className="mb-4">{product.description}</p>
            <h3 className="mb-2 text-base font-medium">Beneficios</h3>
            <ul className="list-disc space-y-1 pl-5">
              {product.benefits?.map((benefit: string, index: number) => (
                <li key={index} className="">
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === "howToUse" && (
          <div className="prose max-w-none">
            <h3 className="mb-2 text-base font-medium">How to Use</h3>
            <p className="">{product.howToUse}</p>
          </div>
        )}

        {activeTab === "ingredients" && (
          <div className="prose max-w-none">
            <h3 className="mb-2 text-base font-medium">Ingredients</h3>
            <p className="">{product.ingredients}</p>
          </div>
        )}
      </div>
    </div>
  );
}
