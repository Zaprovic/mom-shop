import User from "./_components/user";
import { Suspense } from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { db } from "@/db";
import { productsTable, categoriesTable } from "@/db/schema";
import { count, eq } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import Cards from "./_components/cards";
import { RefreshCwIcon } from "lucide-react";
import { DataTable } from "./_components/product-form/_components/data-table";
import { columns } from "./_components/product-form/_components/data-table/columns";

async function getStats(userId: string) {
  const [productCount] = await db
    .select({ count: count() })
    .from(productsTable)
    .where(eq(productsTable.userId, userId));

  const [categoryCount] = await db
    .select({ count: count() })
    .from(categoriesTable)
    .where(eq(categoriesTable.userId, userId));

  return {
    productCount: productCount.count,
    categoryCount: categoryCount.count,
  };
}

const AccountPage = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const userId = user?.id || "";
  const stats = await getStats(userId);

  const products = await db
    .select()
    .from(productsTable)
    .where(eq(productsTable.userId, userId));

  return (
    <div className="mx-auto max-w-7xl px-4 pt-6 pb-12 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
        <Suspense fallback={<div>Cargando...</div>}>
          <User />
        </Suspense>
      </div>

      <Cards stats={stats} />

      <div className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Tus Productos</h2>
          <Button variant="outline" size="sm">
            <RefreshCwIcon className="mr-2 h-4 w-4" /> Refrescar
          </Button>
        </div>
        <Suspense
          fallback={
            <div className="py-10 text-center">Cargando productos...</div>
          }
        >
          <DataTable columns={columns} data={products} />
        </Suspense>
      </div>
    </div>
  );
};

export default AccountPage;
