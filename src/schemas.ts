import { createInsertSchema } from "drizzle-zod";
import { categoriesTable, productsTable } from "./db/schema";
import { z } from "zod";

export const insertProductSchema = createInsertSchema(productsTable);
export const insertCategorySchema = createInsertSchema(categoriesTable, {
  name: z.string().min(2, {
    message: "El nombre de la categoría debe tener al menos 2 caracteres.",
  }),
});
