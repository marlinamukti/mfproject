export const COLORS = `[COLORS]`;

export const FETCH_COLORS = `${COLORS} FETCH_COLORS`
export const ADD_COLORS = `${COLORS} ADD_COLORS`

export const fetchColors = (colors) => ({
    type: FETCH_COLORS,
    payload: colors
})

export const addColors = (colors) => ({
    type: ADD_COLORS,
    payload: colors
})
