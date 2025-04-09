import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  primaryKey,
  real,
  serial,
  text,
} from "drizzle-orm/pg-core";

export const productsTable = pgTable("Product", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  price: real("price").notNull(),
  brand: text("brand").notNull(),
  mainImage: text("main_image").notNull(),
  description: text("description").notNull(),

  userId: text("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),

  // optional fields
  discountPercentage: real("discount_percentage").default(0),
  images: text("images").array().default([]),
  benefits: text("benefits").array().default([]),
  howToUse: text("how_to_use"),
  ingredients: text("ingredients").array().default([]),
  inStock: boolean("in_stock").default(true),
  createdAt: text("created_at").default(new Date().toISOString()),
  updatedAt: text("updated_at").default(new Date().toISOString()),
});

export const categoriesTable = pgTable("Category", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  isActive: boolean("is_active").default(true),
  userId: text("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
});

export const productCategoryTable = pgTable(
  "ProductCategory",
  {
    productId: integer("product_id")
      .notNull()
      .references(() => productsTable.id, { onDelete: "cascade" }),
    categoryId: integer("category_id")
      .notNull()
      .references(() => categoriesTable.id, { onDelete: "cascade" }),
  },
  (t) => [
    primaryKey({
      columns: [t.productId, t.categoryId],
      name: "pk_product_category",
    }),
  ],
);

export const usersTable = pgTable("User", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
});

export const userRelations = relations(usersTable, ({ many }) => ({
  categoriesTable: many(categoriesTable),
  productsTable: many(productsTable),
}));

export const productRelations = relations(productsTable, ({ one, many }) => ({
  usersTable: one(usersTable, {
    fields: [productsTable.userId],
    references: [usersTable.id],
  }),
  productCategoryTable: many(productCategoryTable),
}));

export const categoryRelations = relations(
  categoriesTable,
  ({ one, many }) => ({
    usersTable: one(usersTable, {
      fields: [categoriesTable.userId],
      references: [usersTable.id],
    }),
    productCategoryTable: many(productCategoryTable),
  }),
);

export const productsCategoriesRelations = relations(
  productCategoryTable,
  ({ one }) => ({
    categoriesTable: one(categoriesTable, {
      fields: [productCategoryTable.categoryId],
      references: [categoriesTable.id],
    }),

    productsTable: one(productsTable, {
      fields: [productCategoryTable.productId],
      references: [productsTable.id],
    }),
  }),
);
