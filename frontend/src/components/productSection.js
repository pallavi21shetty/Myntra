import React, { useState, useEffect } from "react";
import ProductItem from "./productItem";

const ProductsSection = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products/all")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error("Unexpected data:", data);
          setProducts([]);
        }
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <>
      {products.map((product) => (
        <ProductItem key={product._id} product={product} />
      ))}
    </>
  );
};

export default ProductsSection;
