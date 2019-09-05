import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchProducts } from '../../services/shelf/actions';

import Spinner from '../Spinner';
import ShelfHeader from './ShelfHeader';
import ProductList from './ProductList';

import './style.scss';

class Shelf extends Component {
  static propTypes = {
    fetchProducts: PropTypes.func.isRequired,
    products: PropTypes.array.isRequired,
  };
  state = {
    isLoading: false
  };

  componentDidMount() {
    this.handleFetchProducts();
  }

  handleFetchProducts = (
  ) => {
    this.setState({ isLoading: true });
    this.props.fetchProducts(() => {
      this.setState({ isLoading: false });
    });
  };

  render() {
    const { products } = this.props;
    const { isLoading } = this.state;

    return (
      <React.Fragment>
        {isLoading && <Spinner />}
        <div className="shelf-container">
          <ShelfHeader productsLength={products.length} />
          <ProductList products={products} />          
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  products: state.shelf.products,
});

export default connect(
  mapStateToProps,
  { fetchProducts }
)(Shelf);
