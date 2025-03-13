import ProductList from "@/components/shared/product/product-list";
import { getLatestProducts } from "@/lib/actions/product.actions";
import { Suspense } from "react";

const HomePage = async () => {
  const latestProducts = await getLatestProducts();
  // console.log(latestProducts);
  return (
    <div>
      <Suspense fallback={<p>Loading...</p>}>
        <ProductList data={latestProducts} title="Newest Arrivals" limit={4} />
      </Suspense>
    </div>
  );
};

export default HomePage;
