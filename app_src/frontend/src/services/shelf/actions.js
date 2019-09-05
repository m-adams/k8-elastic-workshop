import { FETCH_PRODUCTS } from './actionTypes';
import axios from 'axios';

import { productsAPI } from '../util';

export const fetchProducts = (callback) => dispatch => {
  return axios
    .get(productsAPI)
    .then(res => {
      let products = res.data;

      if (!!callback) {
        callback();
      }

      return dispatch({
        type: FETCH_PRODUCTS,
        payload: products
      });
    })
    .catch(err => {
      console.log('Could not fetch products. Try again later.');
    });
};
