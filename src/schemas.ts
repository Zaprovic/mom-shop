import { createInsertSchema } from "drizzle-zod";
import { categoriesTable, productsTable } from "./db/schema";
import { z } from "zod";

// Base product schema from drizzle-zod
export const insertProductSchema = createInsertSchema(productsTable, {
  name: z.string().min(2, {
    message: "El nombre del producto debe tener al menos 2 caracteres.",
  }),
  price: z.coerce.number().gt(0, {
    message: "El precio del producto debe ser mayor a 0.",
  }),
  brand: z.string().min(2, {
    message: "La marca del producto debe tener al menos 2 caracteres.",
  }),
  mainImage: z.string().url({
    message: "La imagen principal debe ser una URL válida.",
  }),
  description: z.string().min(1, {
    message: "La descripción del producto no puede estar vacía.",
  }),
  discountPercentage: z.coerce.number().min(0).max(100),
  images: z.array(z.string().url()),
  benefits: z.array(z.string()),
  howToUse: z.string().optional(),
  ingredients: z.array(z.string()),
  inStock: z.boolean(),
});

// Extend the schema with categoryIds for the form
export const productFormSchema = insertProductSchema.extend({
  categoryIds: z.array(z.number()).min(1, {
    message: "Seleccione al menos una categoría",
  }),
});

export const insertCategorySchema = createInsertSchema(categoriesTable, {
  name: z.string().min(2, {
    message: "El nombre de la categoría debe tener al menos 2 caracteres.",
  }),
});
