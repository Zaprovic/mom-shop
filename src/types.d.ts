import { categoriesTable, productsTable } from "./db/schema";

export type CreateProductType = typeof productsTable.$inferSelect;
export type CreateCategoryType = typeof categoriesTable.$inferSelect;
