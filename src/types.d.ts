// dummy comments

import { categoriesTable, productsTable } from "./db/schema";

export type SelectProductType = typeof productsTable.$inferSelect;
export type InsertProductType = typeof productsTable.$inferInsert;

export type SelectCategoryType = typeof categoriesTable.$inferSelect;
export type InsertCategoryType = typeof categoriesTable.$inferInsert;

export type SelectProductWithCategoryType =
  typeof productsTable.$inferSelect & {
    categories: SelectCategoryType[];
  };
