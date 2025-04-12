"use server";

import { db } from "@/db";
import { categoriesTable } from "@/db/schema";
import { InsertCategoryType } from "@/types";
import { revalidatePath } from "next/cache";

export const insertCategoryAction = async (formData: InsertCategoryType) => {
  try {
    const categoryToAdd = await db
      .insert(categoriesTable)
      .values({
        ...formData,
        name: formData.name.trim().toUpperCase(),
      })
      .returning();
    revalidatePath("/account");

    return categoryToAdd;
  } catch (e) {
    if (e instanceof Error) {
      return {
        error: e.message,
      };
    } else {
      return {
        error: "An unknown error occurred",
      };
    }
  }
};
