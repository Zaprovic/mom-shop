export const revalidate = 0;

type props = {
  searchParams: { categoryId: string; productName: string };
};

const ProductsPage = async ({ searchParams }: props) => {
  return <div>Pagina de productos</div>;
};

export default ProductsPage;
