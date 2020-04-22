export const THUMBDISPLAY = 'THUMBDISPLAY';

export const FETCH_THUMBDISPLAY = `${THUMBDISPLAY} FETCH_THUMBDISPLAY`
export const SET_THUMBDISPLAY = `${THUMBDISPLAY} SET_THUMBDISPLAY`

export const fetchThumbDisplay = (thumbdisplay) => ({
    type: FETCH_THUMBDISPLAY,
    payload: thumbdisplay
})

export const setThumbdisplay = (thumbdisplay) => ({
    type: SET_THUMBDISPLAY,
    payload: thumbdisplay
})