CREATE TABLE "Category" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"is_active" boolean DEFAULT true,
	"user_id" text NOT NULL,
	CONSTRAINT "Category_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "ProductCategory" (
	"product_id" integer NOT NULL,
	"category_id" integer NOT NULL,
	CONSTRAINT "pk_product_category" PRIMARY KEY("product_id","category_id")
);
--> statement-breakpoint
CREATE TABLE "Product" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"price" real NOT NULL,
	"brand" text NOT NULL,
	"main_image" text NOT NULL,
	"description" text NOT NULL,
	"user_id" text NOT NULL,
	"discount_percentage" real DEFAULT 0,
	"images" text[] DEFAULT '{}',
	"benefits" text[] DEFAULT '{}',
	"how_to_use" text,
	"ingredients" text[] DEFAULT '{}',
	"in_stock" boolean DEFAULT true,
	"created_at" text DEFAULT '2025-04-09T00:58:27.683Z',
	"updated_at" text DEFAULT '2025-04-09T00:58:27.684Z'
);
--> statement-breakpoint
CREATE TABLE "User" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "Category" ADD CONSTRAINT "Category_user_id_User_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ProductCategory" ADD CONSTRAINT "ProductCategory_product_id_Product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."Product"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ProductCategory" ADD CONSTRAINT "ProductCategory_category_id_Category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."Category"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Product" ADD CONSTRAINT "Product_user_id_User_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;