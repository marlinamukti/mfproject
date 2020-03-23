export const THUMBDISPLAY = 'THUMBDISPLAY';

export const FETCH_THUMBDISPLAY = `${THUMBDISPLAY} FETCH_THUMBDISPLAY`

export const fetchThumbDisplay = (thumbdisplay) => ({
    type: FETCH_THUMBDISPLAY,
    payload: thumbdisplay
})