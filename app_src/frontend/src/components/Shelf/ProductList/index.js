import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { show } from 'redux-modal'
import ItemModal from './../ItemDetails'
import PropTypes from 'prop-types';

import Product from './Product'

class ProductList extends Component {
  static propTypes = {
    products: PropTypes.array.isRequired,
    show: PropTypes.func.isRequired
  };

  handleOpen = (product) => {
  	const { show } = this.props;
    show('itemmodal', { productId: product.id })
  };

  render() {
  	const { products } = this.props;

  	const productElements = products.map(p => {
      return (
        <Product product={p} handleOpen={this.handleOpen} key={p.id} />
      );
    });

  	return (
  		<div className="shelf-container-inner">
		  	{productElements}
		  	<ItemModal />
	  	</div>
  	)
  }
}

export default connect(
  null,
  dispatch => bindActionCreators({ show }, dispatch)
)(ProductList)

