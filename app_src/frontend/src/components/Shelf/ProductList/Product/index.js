import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Thumb from '../../../Thumb';
import { formatPrice } from '../../../../services/util';
import { addProduct } from '../../../../services/cart/actions';

const Product = ({ product, handleOpen, addProduct }) => {
  product.quantity = 1;

  let formattedPrice = formatPrice(product.price, product.currencyId);

  return (
    <div
      className="shelf-item"
      data-sku={product.sku}
    >
     <div className="item-details" onClick={() => handleOpen(product)} >
      <Thumb
        classes="shelf-item__thumb"
        src={require(`../../../../static/products/${product.sku}.png`)}
        alt={product.title}
      />
      <p className="shelf-item__title">{product.title}</p>
      <div className="shelf-item__price">
        <div className="val">
          <small>{product.currencyFormat}</small>
          <b>{formattedPrice.substr(0, formattedPrice.length - 3)}</b>
          <span>{formattedPrice.substr(formattedPrice.length - 3, 3)}</span>
        </div>
      </div>
      </div>
      <div onClick={() => addProduct(product)} className="shelf-item__buy-btn">Add to cart</div>
    </div>
  );
};

Product.propTypes = {
  product: PropTypes.object.isRequired,
  addProduct: PropTypes.func.isRequired
};

export default connect(
  null,
  { addProduct }
)(Product);
