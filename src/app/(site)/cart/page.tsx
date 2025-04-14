import Checkout from "./_components/checkout";
import PageWrapper from "./_components/page-wrapper";
import ProductsInCart from "./_components/products-in-cart";

const CartPage = () => {
  return (
    <PageWrapper>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="overflow-hidden rounded-xl bg-white shadow-md dark:border dark:border-gray-700/50 dark:bg-gray-800/50 dark:backdrop-blur-sm">
            <ProductsInCart />
          </div>
        </div>

        <Checkout />
      </div>
    </PageWrapper>
  );
};

export default CartPage;
