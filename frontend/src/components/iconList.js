import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCurrentProduct } from '../actions/setCurrentProductActions';
import { addToCart } from '../actions/cartActions'; // Import the action for incrementing the cart counter
import {addToWishlist} from '../actions/wishlistActions';



const IconsList = ({ product }) => {
  const dispatch = useDispatch();

  const handleProductClick = () => {
    dispatch(setCurrentProduct(product));
  };

  const handleShoppingBagClick = () => {
    dispatch(addToCart(product));
    alert('Carted')
  };

  const handleHeartClick = () => {
    dispatch(addToWishlist(product));
  };
  
  return (
    <ul className="d-flex align-items-center justify-content-center list-unstyled icons">
      <li className="icon">
        <Link to={{ pathname: `/details/` }} onClick={handleProductClick}>
          <span className="fas fa-expand-arrows-alt"></span>
        </Link>
      </li>
      <li className="icon mx-3" onClick={handleHeartClick}>
        <span className="far fa-heart"></span>
      </li>
      <li className="icon" onClick={handleShoppingBagClick}>
        <span className="fas fa-shopping-bag"></span>
      </li>
    </ul>
  );
};

export default IconsList;
