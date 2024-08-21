import React, { useState, useEffect } from 'react';
import ProductItemSmall from '../components/productItemSmall';
import Sidebar from '../components/sidebar';
const ProductsSearch = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
    <>
        <Sidebar/>
        <div className='col-md-9'>
          <div className='container-fluid'>
            <div className='row'>
              {products.map(product => (
                <ProductItemSmall key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
    </>
  );
};

export default ProductsSearch;
