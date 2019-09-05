import { combineReducers } from 'redux';
import shelfReducer from './shelf/reducer';
import cartReducer from './cart/reducer';
import totalReducer from './total/reducer';
import sortReducer from './sort/reducer';
import { reducer as modal } from 'redux-modal'

export default combineReducers({
  shelf: shelfReducer,
  cart: cartReducer,
  total: totalReducer,
  sort: sortReducer,
  modal 
});
