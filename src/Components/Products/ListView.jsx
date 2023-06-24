import React from "react";
import ListProduct from "../FeaturedProducts/ListProduct";
import { useGlobalFilterContext } from "../../Contexts/FilterContext";

const ListView = () => {
  const { filteredProducts } = useGlobalFilterContext();

  return (
    <div className="product-list-container">
      {filteredProducts &&
        filteredProducts.map((i) => {
          return <ListProduct key={i._id} pro={i} />;
        })}
    </div>
  );
};

export default ListView;
