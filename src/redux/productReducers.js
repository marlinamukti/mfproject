import { ADD_PRODUCT, FETCH_PRODUCT } from './productAction'
import initialState from './initialState';

export function products(state = initialState.products, action){
    let newState = [...state]

    switch(action.type){
        case FETCH_PRODUCT:
            return action.payload
        case ADD_PRODUCT:
            return newState
        default:
            return state
    }
}

