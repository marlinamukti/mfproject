import {createStore, compose, combineReducers } from 'redux';
import { products } from './productReducers';
import { imgThumbDisplay } from './thumbdisplayReducers'
import { users } from './userReducers'
import { colors } from './colorReducers'

const rootReducer = combineReducers({
    products, imgThumbDisplay, users, colors
});

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, storeEnhancers());

export default store;