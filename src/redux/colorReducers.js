import { ADD_COLORS, FETCH_COLORS} from './colorAction'
import initialState from './initialState'

export function colors(state = initialState.colors, action){
    let newState = [...state]

    switch(action.type){
        case ADD_COLORS:
            return newState
        case FETCH_COLORS:
            return action.payload
        default:
            return state
    }
}