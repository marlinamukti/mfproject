import {FETCH_THUMBDISPLAY} from './thumbdisplayAction'
import initialState from './initialState';

export function imgThumbDisplay(state = initialState.imgThumbDisplay, action){
    switch(action.type){
        case FETCH_THUMBDISPLAY:
            return state
        default:
            return state
    }
}
