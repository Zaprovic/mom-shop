export const revalidate = 0;

type props = {
  searchParams: { categoryId: string; productName: string };
};

const ProductsPage = async ({ searchParams }: props) => {
  return <div>ProductsPage</div>;
};

export default ProductsPage;
