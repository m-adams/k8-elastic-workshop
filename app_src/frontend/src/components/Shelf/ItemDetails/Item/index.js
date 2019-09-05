import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../../../Spinner';
import Thumb from '../../../Thumb';
import axios from 'axios';
import { productDetailsAPI } from '../../../../services/util';
import { formatPrice } from '../../../../services/util';

class Item extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
  };

  state = {
    isLoading: false,
    item: undefined,
    error: false
  };

  componentWillMount() {
    axios
    .get(productDetailsAPI + this.props.id)
    .then(res => {
      let item = res.data;
      this.setState({item: item})
    })
    .catch(err => {
      this.setState({item: "error"})
    });
  }

  handleFetchProducts = () => {
    const { id } = this.props;
    this.setState({ isLoading: true});
    this.props.getProductDetails(id, () => {
        this.setState({ isLoading: false });
    });
  };

  render() {
    const { isLoading, item } = this.state;
 
    const itemExists = item !== undefined && item !== "error";
    const formattedPrice = itemExists ? formatPrice(item.price, item.currencyId) : 0;
    const itemError = item === "error";

    if (itemError) {
      return (
      <React.Fragment>
        <div>
          Error
        </div>
      </React.Fragment>
    );
    }
    const product_info = itemExists ? (
      <div
      className="shelf-item"
      data-sku={item.sku}
    >
     <div >
      <Thumb
        classes="shelf-item__thumb"
        src={require(`../../../../static/products/${item.sku}.png`)}
        alt={item.title}
      />
      <p className="shelf-item__title">Name: {item.title}</p>
      <p className="shelf-item__title">Style: {item.style}</p>
      <p className="shelf-item__title">SKU: {item.sku}</p>
      <div className="shelf-item__price">
        <div className="val">
          <small>{item.currencyFormat}</small>
          {formattedPrice.substr(0, formattedPrice.length - 3)}
          <span>{formattedPrice.substr(formattedPrice.length - 3, 3)}</span>
        </div>
      </div>
      </div>
    </div>
    ) : 'Loading...';

    return (
      <React.Fragment>
        {isLoading && <Spinner />}
        <div>
          {product_info}
        </div>
      </React.Fragment>
    );
  }
}

export default Item;
