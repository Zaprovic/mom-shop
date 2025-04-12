"use server";

import { db } from "@/db";
import { productsTable, productCategoryTable } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { insertProductSchema } from "@/schemas";
import { z } from "zod";

// Define the input type including categoryIds
export type CreateProductInput = z.infer<typeof insertProductSchema> & {
  categoryIds: number[];
};

export async function createProductAction(input: CreateProductInput) {
  try {
    if (!input.userId) {
      console.error("Missing userId in product creation");
      return { success: false, error: "User ID is required" };
    }

    const [product] = await db
      .insert(productsTable)
      .values({
        name: input.name,
        price: input.price,
        brand: input.brand,
        mainImage: input.mainImage,
        description: input.description,
        userId: input.userId,
        discountPercentage: input.discountPercentage || 0,
        images: input.images || [],
        benefits: input.benefits || [],
        howToUse: input.howToUse || "",
        ingredients: input.ingredients || [],
        inStock: input.inStock !== undefined ? input.inStock : true,
      })
      .returning();

    console.log("Product created successfully:", product.id);

    if (input.categoryIds && input.categoryIds.length > 0) {
      try {
        await db.insert(productCategoryTable).values(
          input.categoryIds.map((categoryId) => ({
            productId: product.id,
            categoryId,
          })),
        );
        console.log(`Added ${input.categoryIds.length} categories to product`);
      } catch (categoryError) {
        console.error("Error adding categories to product:", categoryError);
      }
    }

    revalidatePath("/account");
    return { wasSuccessful: true, data: product };
  } catch (error) {
    console.error("Error creating product:", error);
    return {
      wasSuccessful: false,
      error:
        error instanceof Error ? error.message : "Failed to create product",
    };
  }
}
