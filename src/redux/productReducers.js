import { ADD_PRODUCT, FETCH_PRODUCT, EDIT_PRODUCT, DELETE_PRODUCT } from './productAction'
import initialState from './initialState';

export function products(state = initialState.products, action){
    let newState = [...state]
    let index

    switch(action.type){
        case FETCH_PRODUCT:
            return action.payload
        case ADD_PRODUCT:
            newState.push(action.payload)
            return newState
        case EDIT_PRODUCT:
            index = newState.findIndex(p => p.id === action.payload.id)
            newState[index] = action.payload
            return newState
        case DELETE_PRODUCT:
            index = newState.findIndex(p => p.id === action.payload)
            newState.splice(index, 1)
            return newState
        default:
            return state
    }
}

