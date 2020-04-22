import {FETCH_THUMBDISPLAY, SET_THUMBDISPLAY} from './thumbdisplayAction'
import initialState from './initialState';

export function imgThumbDisplay(state = initialState.imgThumbDisplay, action){
    switch(action.type){
        case FETCH_THUMBDISPLAY:
            return state
        case SET_THUMBDISPLAY:
            return action.payload
        default:
            return state
    }
}
